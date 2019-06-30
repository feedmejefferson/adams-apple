import { makeChoice, reverse } from "../actions";
import { handleChoice, handleReverse } from "../reducers";
import { Choice, Dilemma, Mood } from "../types";

describe("Reducer tests", () => {
    test("choice reducer updates choices", () => {
        const dilemma: Dilemma<string> = {a:'a',b:'b'};
        const choice: Choice<string> = {chosen: 'a', notChosen: 'b'}
        const startingMood: Mood<string> = {
            dilemma,
            choices: []
        }
        const newState = handleChoice(startingMood, makeChoice(choice));
        expect(newState.choices[0]).toBe(choice);
    });
    // this reducer is just for learning purposes
    test("reverse reducer reverses dilemma", () => {
        const dilemma: Dilemma<string> = {a:'a',b:'b'};
        const startingMood: Mood<string> = {
            dilemma,
            choices: []
        }
        const newState = handleReverse(startingMood, reverse());
        expect(newState.dilemma).toEqual({a:'b',b:'a'});
    });

});
