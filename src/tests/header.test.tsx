import { Component, h } from "preact";
// See: https://github.com/mzgoddard/preact-render-spy
import { deep, shallow } from "preact-render-spy";
import { Link } from "preact-router/match";
import { Header } from "../components/header";

describe("Initial Test of the Header", () => {
    test("Header renders", () => {
//        const context = shallow(<Header />);
        // TODO: Fix this -- not sure how to test this now that
        // it's wired with unistore's connect method
//        expect(context.find("h1").text()).toBe("Adams 🍎");
    });
});
