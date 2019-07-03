import { Component, h } from "preact";
import { connect } from "unistore/preact";
import { actions } from "../../state"
import { Food } from "../food";
import * as style from "./style.css";

export const Recommendation = connect('recommendation', actions)(({recommendation, accept, reject}: any) => 
    <div class={style.recommendation}>
        <Food id={recommendation.id} />
    </div>
)
