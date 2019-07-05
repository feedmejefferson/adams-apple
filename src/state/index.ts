import createStore, {Store} from "unistore";
import { food, newAppState, randomDilemma } from "./constants";
import { loadBranch } from "./tree-loader";
import { AppState } from "./types";

export const globalState = createStore<AppState>(newAppState());

// globalState.subscribe((state: AppState) => console.log(state));

function chooseSide(state: AppState, side: number) {
    // A = 0/falsy, B = 1/truthy
    const branch = state.branch*2+side;
    const choiceMade = { 
        chosen: side ? state.dilemma.b :state.dilemma.a, 
        notChosen: side ? state.dilemma.a : state.dilemma.b 
    };
    const choices = [...state.choices, choiceMade];

    if(state.analytics){
    // @ts-ignore
    gtag('event', 'prefer', {
        'event_category': `/food/${choiceMade.chosen.id}`,
        'event_label': `branch=${branch}`,
        'value': choices.length
        });
    // @ts-ignore
    gtag('event', 'decline', {
        'event_category': `/food/${choiceMade.notChosen.id}`,
        'event_label': `branch={branch}`,
        'value': choices.length
        });
    }
    
    if(state.tree.get(branch)) {
        // we're on a terminal branch -- transition over to the recommendation
        // phase by proposing anything that was chosen, but not not chosen
        const chosen = choices.map(c => c.chosen.id);
        const notChosen = choices.map(c => c.notChosen.id);
        const contenders = chosen.filter(c => !notChosen.includes(c));
        const finalists = Array.from(new Set<string>(contenders));
        const recommendations = finalists.map(f => food(f));

        window.history.pushState("object or string", "Recommended Food", `/food/${recommendations[recommendations.length-1].id}`);
        return {
            branch,
            recommendations,
            choices: [...state.choices, choiceMade ]
        };
    } 
    const dilemma = randomDilemma(state.tree, branch)
    window.history.pushState("object or string", "Another Food Dilemma", `/choice/?branch=${branch}&a=${dilemma.a.id}&b=${dilemma.b.id}`);
    return {
        branch,
        dilemma,
        choices: [...state.choices, choiceMade ]
    };    
}

export const actions = (store: Store<AppState>) => ({

    chooseA(state: AppState) {
        return chooseSide(state, 0);
    },

    chooseB(state: AppState) {
        return chooseSide(state, 1);
    },

    accept({analytics, recommendations}: AppState) {
        if(!analytics) { return; }
        // @ts-ignore
        gtag('event', 'accept', {
            'event_category': `/food/${recommendations[recommendations.length-1].id}`
        });
    },
    
    reject({analytics, recommendations, choices}: AppState) {
        if(analytics) { 
            // @ts-ignore
            gtag('event', 'reject', {
                'event_category': `/food/${recommendations[recommendations.length-1].id}`
            });
        }
        if(recommendations.length===1) {
            // start over
            window.location.href="/";
        }
        const newRecs= [...recommendations];
        newRecs.pop();
        return({recommendations: newRecs});


    },


    expandBranch({ branch }: AppState) {
        loadBranch(store, branch);
    },

    startOver({ tree }: AppState) {
        // TODO: figure out why dilemmas stop rerendering if I don't us
        // this "nuclear" option of doing a full reload. It isn't the worst
        // option, but it would be nice to manage the transition a bit better.
        window.location.href="/";
        return {
            branch: 1,
            dilemma: randomDilemma(tree, 1),
            recommendation: undefined,
            choices: []
        };
    },

});

