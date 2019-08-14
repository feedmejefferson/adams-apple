import { newAppState } from "../state/constants";

const app = newAppState();

describe("Basket tests", () => {
    test("update works", () => {
        expect(app.basket.getAttributions("0000096").id).toEqual("0000096");
//         const partial = {"a": foodDetail("a"),"b": foodDetail("b")};
//         updateBasket(partial);
// // tslint:disable-next-line: no-string-literal
//         expect(basket["a"].id).toEqual("a");
    });

});
