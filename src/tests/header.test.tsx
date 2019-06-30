import { Component, h } from "preact";
// See: https://github.com/mzgoddard/preact-render-spy
import { deep, shallow } from "preact-render-spy";
import { Link } from "preact-router/match";
import Header from "../components/header";

describe("Initial Test of the Header", () => {
    test("Header renders 3 nav items", () => {
        const context = shallow(<Header />);
        expect(context.find("h1").text()).toBe("Adams 🍎");
    });
});
