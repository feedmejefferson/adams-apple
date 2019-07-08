import { Component, h } from "preact";
import { connect } from "unistore/preact";
import { actions, globalState } from "../../state"
import { food } from "../../state/constants"
import { Food } from "../food";
import * as style from "./style.css";

export const Procurement = connect('recommendations', actions)(({recommendations, cookIt, deliverIt}: any) => 
    <Food id={recommendations[recommendations.length-1].id} >
        <div class={style.methods}>
            <button class={style.cook} onClick={cookIt}>🍳</button>
            <button class={style.deliver} onClick={deliverIt}>🚚</button>
        </div>
    </Food>
)

interface Props {
    likes: string;
}

export const ProcurementRoute = ({likes}: Props) => {
    if(likes) {
        const recommendations = likes.split("~").map(id => food(id));
        globalState.setState({recommendations});
    }
    return <Procurement/>
}
