import { Component, h } from "preact";
import { connect } from "unistore/preact";
import { actions, globalState } from "../../state"
import { food } from "../../state/constants"
import * as style from "./style.css";

export const Recommendation = connect('recommendations', actions)(({recommendations, accept, reject, startOver}: any) => 
<div class={style.recommendation}
    style={`background-image: url(/assets/images/${recommendations[recommendations.length-1].id}.jpg)`} 
>
    <div class={style.feedback}>
        <button class={style.accept} onClick={accept}>👍</button>
        <button class={style.reject} onClick={reject}>👎</button>
    </div>
</div>
)

interface Props {
    likes: string;
}

export const RecRoute = ({likes}: Props) => {
    if(likes) {
        const recommendations = likes.split("~").map(id => food(id));
        globalState.setState({recommendations});
    }
    return <Recommendation/>
}
