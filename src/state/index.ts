import { route } from "preact-router";
import createStore, {Store} from "unistore";
// import unistoreDevTools from "unistore/devtools";
import { food, newAppState, randomDilemma } from "./constants";
import { loadBranch } from "./tree-loader";
import { AppState } from "./types";

// export const globalState = unistoreDevTools(createStore<AppState>(newAppState()));
export const globalState = createStore<AppState>(newAppState());

 globalState.subscribe((state: AppState) => console.log(state));

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

        const path = `/food/${recommendations[recommendations.length-1].id}`;
        // @ts-ignore
        gtag('config', 'UA-142228380-1', {
            'page_path': path
        });

        route(path);
//        window.history.pushState("object or string", "Recommended Food", path);
        return {
            branch,
            recommendations,
            choices: [...state.choices, choiceMade ]
        };
    } 
    const dilemma = randomDilemma(state.tree, branch)
    route(`/choice/?branch=${branch}&a=${dilemma.a.id}&b=${dilemma.b.id}`);
//    window.history.pushState("object or string", "Another Food Dilemma", `/choice/?branch=${branch}&a=${dilemma.a.id}&b=${dilemma.b.id}`);
    return {
        branch,
        dilemma,
        choices: [...state.choices, choiceMade ]
    };    
}
function startOverState() {
    const tree = globalState.getState().tree;
    const path = '/';
    // @ts-ignore
    gtag('config', 'UA-142228380-1', {
        'page_path': path
    });

    route(path);
}


export const actions = (store: Store<AppState>) => ({

    chooseA(state: AppState) {
        return chooseSide(state, 0);
    },

    chooseB(state: AppState) {
        return chooseSide(state, 1);
    },

    accept({analytics, recommendations}: AppState) {
        const path = `/feedme/${recommendations[recommendations.length-1].id}`;
        if(analytics) { 
            // @ts-ignore
            gtag('event', 'accept', {
                'event_category': `/food/${recommendations[recommendations.length-1].id}`
            });
            // @ts-ignore
            gtag('config', 'UA-142228380-1', {
                'page_path': path
            });
        }

        route(path);
    },
    
    reject({analytics, recommendations, choices}: AppState) {
        if(analytics) { 
            // @ts-ignore
            gtag('event', 'reject', {
                'event_category': `/food/${recommendations[recommendations.length-1].id}`
            });
        }
        if(recommendations.length===1) {
            return (startOverState());
        }
        const newRecs= [...recommendations];
        newRecs.pop();
        return({recommendations: newRecs});


    },

    cookIt({recommendations}: AppState) {
        const f = recommendations[recommendations.length-1].title;
        window.open(`https://www.google.com/search?q=${f}+recipes`, '_blank');

    },
    deliverIt({recommendations}: AppState) {
        const f = recommendations[recommendations.length-1].title;
        window.open(`https://www.google.com/search?q=${f}+delivery+near+me`, '_blank');

    },

    expandBranch({ branch }: AppState) {
        loadBranch(store, branch);
    },

    startOver() {
        return(startOverState());
    }

});

