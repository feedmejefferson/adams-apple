import createStore, {Store} from "unistore";
import { Appetite } from "./types";

export const globalState = createStore<Appetite>(new Appetite());

// globalState.subscribe((state: Appetite) => console.log(state));

export const actions = (store: Store<Appetite>) => ({

    chooseA(state: Appetite) {
        return {choices: [...state.choices, {chosen: state.dilemma.a, notChosen: state.dilemma.b}]};
    },

    chooseB: ({choices, dilemma}: Appetite) => 
    ({choices: [...choices, {chosen: dilemma.b, notChosen: dilemma.a}]}),

    reverse({dilemma}: Appetite) {
        return {dilemma: {a: dilemma.b, b: dilemma.a}}
    }
});

