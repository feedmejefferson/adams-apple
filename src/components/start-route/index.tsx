import { Component, h } from "preact";
import { route } from "preact-router";
import { connect } from "unistore/preact";
import { actions, globalState } from "../../state"
import { food, randomDilemma } from "../../state/constants"
import { prefetchImages } from "../../state/tree-loader";


export const StartRoute = () => {
    const { basket } = globalState.getState()
    const dilemma = randomDilemma(basket, 1);
//    console.log("start route", dilemma);
    prefetchImages([dilemma.a.id, dilemma.b.id]);
    globalState.setState({branch: 1, dilemma, choices: [], recommendations: []});
    route(`/choice/?branch=1&a=${dilemma.a.id}&b=${dilemma.b.id}`, true);
    return <div/>;
}
