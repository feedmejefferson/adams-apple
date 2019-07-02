import { Component, h } from "preact";
import { connect } from "unistore/preact";
import { actions } from "../../state"
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
