import { Component, h } from "preact";
import { connect } from "unistore/preact";
import { actions, globalState } from "../../state"
import { food } from "../../state/types"
import * as style from "./style.css";

export const Recommendation = connect('recommendation', actions)(({recommendation, accept, reject, startOver}: any) => 
<div class={style.recommendation}
    style={`background-image: url(/assets/images/${recommendation.id}.jpg)`} 
>
    <div class={style.feedback}>
        <button class={style.accept} onClick={() => {accept();startOver();}}>👍</button>
        <button class={style.reject} onClick={() => {accept();startOver();}}>👎</button>
    </div>
</div>
)

interface Props {
    id: string;
}

export const RecRoute = ({id}: Props) => {
    globalState.setState({recommendation: food(id)});
    return <Recommendation/>
}
