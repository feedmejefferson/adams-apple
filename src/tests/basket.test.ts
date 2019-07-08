import { basket, foodDetail, updateBasket } from "../state/constants";

describe("Basket tests", () => {
    test("update works", () => {
        expect(basket["0000004"].id).toEqual("0000004");
        const partial = {"a": foodDetail("a"),"b": foodDetail("b")};
        updateBasket(partial);
// tslint:disable-next-line: no-string-literal
        expect(basket["a"].id).toEqual("a");
    });

});
