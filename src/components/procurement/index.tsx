import { Component, h } from "preact";
import { connect } from "unistore/preact";
import { actions, globalState } from "../../state"
import { food } from "../../state/constants"
import * as style from "./style.css";

export const Procurement = connect('recommendations', actions)(({recommendations, accept, reject, startOver}: any) => 
<div class={style.procurement}
    style={`background-image: url(/assets/images/${recommendations[recommendations.length-1].id}.jpg)`} 
>
    <div class={style.methods}>
        <button class={style.cook}>🍳</button>
        <button class={style.deliver}>🚚</button>
    </div>
</div>
)

interface Props {
    id: string;
}

export const ProcurementRoute = ({id}: Props) => {
    globalState.setState({recommendations: [food(id)]});
    return <Procurement/>
}
