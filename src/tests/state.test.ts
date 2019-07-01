import { actions, globalState } from "../state";
import { Appetite, Choice, Dilemma, dilemma, food } from "../state/types";

describe("Reducer tests", () => {
    test("choice reducer updates choices", () => {
        const app = new Appetite();
        app.dilemma = dilemma('a', 'b');
        const choice={chosen: food('a'), notChosen: food('b')};
        expect(actions(globalState).chooseA(app).choices[0]).toEqual(choice);
    });
    // this reducer is just for learning purposes
    test("reverse reducer reverses dilemma", () => {
        const app = new Appetite();
        app.dilemma = dilemma('a', 'b');
        const reversed = dilemma('b', 'a')
        expect(actions(globalState).reverse(app).dilemma).toEqual(reversed);
    });

});
