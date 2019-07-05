import { actions, globalState } from "../state";
import { dilemma, food, newAppState } from "../state/constants";

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
