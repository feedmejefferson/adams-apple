import { Component, h } from "preact";
import { route } from "preact-router";
import { connect } from "unistore/preact";
import { actions, globalState } from "../../state"
import { food, randomDilemma } from "../../state/constants"


export const StartRoute = () => {
    const { tree } = globalState.getState()
    const dilemma = randomDilemma(tree, 1);
    globalState.setState({branch: 1, dilemma});
    route(`/choice/?branch=1&a=${dilemma.a.id}&b=${dilemma.b.id}`, true);
    return <div/>;
}
