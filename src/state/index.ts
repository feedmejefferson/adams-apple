import createStore, {Store} from "unistore";
import { loadBranch } from "./tree-loader";
import { AppState, food, newAppState, randomDilemma } from "./types";

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
    
    const recId=state.tree.get(branch); // only defined for terminal nodes
    if(recId) {
        window.history.pushState("object or string", "Recommended Food", `/food/${recId}`);
        return {
            branch,
            recommendation: food(recId),
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

