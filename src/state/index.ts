import { route } from "preact-router";
import createStore, {Store} from "unistore";
import { event, pageview } from "../components/tracker"
// import unistoreDevTools from "unistore/devtools";
import { food, foodDetail, newAppState, randomDilemma } from "./constants";
import { loadBranch } from "./tree-loader";
import { AppState, Side } from "./types";

// export const globalState = unistoreDevTools(createStore<AppState>(newAppState()));
export const globalState = createStore<AppState>(newAppState());

// globalState.subscribe((state: AppState) => console.log(state));

function chooseSide(state: AppState, side: number) {
    // A = 0/falsy, B = 1/truthy
    const chosen = side ? state.dilemma.b :state.dilemma.a;
    const notChosen = side ? state.dilemma.a : state.dilemma.b;
    const choiceMade = { 
        chosen,
        notChosen         
    };
    const choices = [...state.choices, choiceMade];
    // avoid duplicates by filtering out both options
    // push latest choice to the top so that it will be first recommendation
    const recommendations = [...state.recommendations]
    .filter(f => (f.id!==notChosen.id && f.id!==chosen.id));
    recommendations.push(chosen);

    event('prefer', 
        `/food/${choiceMade.chosen.id}`,
        `branch=${state.branch}`, 
        choices.length);
    event('decline', 
        `/food/${choiceMade.notChosen.id}`,
        `branch=${state.branch}`,
        choices.length);
    
    return {
        choices,
        recommendations
    };    
}

export const actions = (store: Store<AppState>) => ({

    chooseA(state: AppState) {
        return chooseSide(state, Side.A);
    },

    chooseB(state: AppState) {
        return chooseSide(state, Side.B);
    },

    accept({analytics, recommendations}: AppState) {
        const likes = recommendations.map(f=>f.id).join("~");
        const path = `/feedme?likes=${likes}`;
        event('accept', `/food/${recommendations[recommendations.length-1].id}`);
        route(path);
    },
    
    reject({analytics, recommendations}: AppState) {
        event('reject', `/food/${recommendations[recommendations.length-1].id}`);
        const newRecs= [...recommendations];
        newRecs.pop();
        const likes = newRecs.map(f => f.id).join("~");
        if(recommendations.length===1) {
            route('/');
        } else {
            route(`/recommendation?likes=${likes}`)
        }
        return({recommendations: newRecs})
    },

    cookIt({recommendations, analytics}: AppState) {
        const f = recommendations[recommendations.length-1];
        const search = foodDetail(f).title;
        event('recipe', `/food/${f.id}`);
        window.open(`https://www.google.com/search?q=${search}+recipes`, '_blank');

    },
    deliverIt({recommendations, analytics}: AppState) {
        const f = recommendations[recommendations.length-1];
        const search = foodDetail(f).title;
        event('deliver', `/food/${f.id}`);
        window.open(`https://www.google.com/search?q=${search}+delivery+near+me`, '_blank');

    },

    expandBranch({ branch }: AppState) {
        loadBranch(store, branch);
    },

});
