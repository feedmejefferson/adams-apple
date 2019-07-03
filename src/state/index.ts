import createStore, {Store} from "unistore";
import { loadBranch } from "./tree-loader";
import { AppState, dilemma as newDilemma, newAppState } from "./types";

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
        // this is a terminal node, stop now and reroute to the food url
        // TODO: do something less hacky here...
        window.location.href=`/food/${choiceMade.chosen.id}`;
        return;
    } 
        
    const dilemma = newDilemma(state.tree.getRandom(branch*2),state.tree.getRandom(branch*2+1));
    //    console.log(history.state);
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

});

