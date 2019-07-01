import { actions, globalState } from "../state";
import { AppState, Choice, Dilemma, dilemma, food, newAppState } from "../state/types";

describe("Reducer tests", () => {
    test("choice reducer updates choices", () => {
        const app = newAppState();
        app.dilemma = dilemma('a', 'b');
        const choice={chosen: food('a'), notChosen: food('b')};
        expect(actions(globalState).chooseA(app).choices[0]).toEqual(choice);
    });

});
