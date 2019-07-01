import createStore, {Store} from "unistore";
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
    if(state.tree.get(branch)) {
        // this is a terminal node, stop now and reroute to the food url
        // TODO: do something less hacky here...
        window.location.href=`/food/${choiceMade.chosen.id}`;
    }
    return {
        branch,
        dilemma: newDilemma(state.tree.getRandom(branch*2),state.tree.getRandom(branch*2+1)),
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
        console.log(branch);
        // using a bit of brute force here to preload branch expansions
        // if(Math.floor(Math.log2(branch))%3!==2) {
        if(Math.floor(Math.log2(branch))%3!==1) {
                return;
        }
        // [0,1].map(x=>x+branch*2)
        [0,1,2,3].map(x=>x+branch*4)
        .forEach(b => {
            fetch(`/assets/meta/indexed-tree.${b}.json`)
            // for now we'll just filter out non existent responses
            .then(res => {if(!res.ok){throw Error()} return res; })
            .then(res => res.json())
            .then(json => {
                const { tree } = store.getState();
                store.setState({tree: tree.expandBranch(b, json)});
            })
        });
            
    },

});

