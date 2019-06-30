import { MakeChoice, Reverse } from "../actions";
import { MAKE_CHOICE, REVERSE } from "../constants";
import { Mood } from "../types";

export function handleChoice<T>(state: Mood<T>, action: MakeChoice<T>): Mood<T> {
    switch(action.type) {
        case MAKE_CHOICE:
            return {
                ...state,
                choices: [ ...state.choices, action.choice]
            };

    }
    return state;
} 
export function handleReverse(state: Mood<any>, action: Reverse): Mood<any> {
    switch(action.type) {
        case REVERSE:
            return {
                ...state,
                dilemma: {a: state.dilemma.b, b: state.dilemma.a}
            };
        }
        return state;

}