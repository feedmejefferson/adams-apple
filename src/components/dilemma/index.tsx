import { Component, h } from "preact";
import { connect } from "unistore/preact";
import { actions, globalState } from "../../state"
import { dilemma as newDilemma } from "../../state/constants";
import { loadBranch } from "../../state/tree-loader";
import { Food } from "../food";
import * as style from "./style.css";

export const Dilemma = connect('dilemma', actions)(({dilemma, chooseA, chooseB, expandBranch}: any) => 
    <div class={style.choice}>
        <div class={style.a}>
            <Food id={dilemma.a.id} onClick={() => {chooseA();expandBranch();}} />
        </div>
        <div class={style.a}>
           <Food id={dilemma.b.id} onClick={() => {chooseB();expandBranch();}} />
        </div>
    </div>
)

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
        dilemma: newDilemma(a ? a : state.dilemma.a.id ,b ? b : state.dilemma.b.id)
    });
    loadBranch(globalState, branch);
    return <Dilemma />
}

