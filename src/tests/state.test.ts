import { actions, globalState } from "../state";
import { AppState, Choice, Dilemma, dilemma, food, newAppState } from "../state/types";

describe("Reducer tests", () => {
    test("choice reducer updates choices", () => {
        const app = newAppState();
        app.analytics = false;
        app.dilemma = dilemma('a', 'b');
        const choice={chosen: food('a'), notChosen: food('b')};
        const newState = actions(globalState).chooseA(app);
        expect(newState).toBeDefined(); 
        expect(newState && newState.choices[0]).toEqual(choice);
    });

});
