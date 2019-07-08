import { Component, h } from "preact";
import { route } from "preact-router";
import { connect } from "unistore/preact";
import { routeForBranch } from "../../routing";
import { actions, globalState } from "../../state"
import { dilemma as newDilemma } from "../../state/constants";
import { loadBranch } from "../../state/tree-loader";
import { Side } from "../../state/types";
import { Food } from "../food";
import * as style from "./style.css";

export const Dilemma = connect(['dilemma','tree', 'branch'], actions)(({dilemma, tree, branch, chooseA, chooseB, expandBranch}: any) => {
    
    const a = routeForBranch(Side.A);
    const b = routeForBranch(Side.B);

    return <div class={style.choice}>
        <div class={style.a}>
            <Food id={dilemma.a.id} onClick={() => {chooseA();route(a);expandBranch();}}/>
        </div>
        <div class={style.a}>
            <Food id={dilemma.b.id} onClick={() => {chooseB();route(b);expandBranch();}}/>
        </div>
    </div>
})

interface Props {
    branch: number;
    a: string;
    b: string;
}

export const DilemmaRoute = ({ branch, a, b }: Props) => {
    const state = globalState.getState();
    branch = branch ? branch : state.branch; // TODO: set to one instead?
    globalState.setState({
        branch,
        dilemma: newDilemma(a ? a : state.dilemma.a.id, b ? b : state.dilemma.b.id)
    });
    loadBranch(globalState, branch);
    return <Dilemma />
}

