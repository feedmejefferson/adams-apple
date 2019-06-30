import * as actions from "../actions"
import * as constants from "../constants"

describe("Action tests", () => {
    test("make choice returns a valid action", () => {
        expect(actions.makeChoice({chosen:'a', notChosen:'b'}).type).toBe(constants.MAKE_CHOICE);
    });
});
