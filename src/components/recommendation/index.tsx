import { Component, h } from "preact";
import { connect } from "unistore/preact";
import { actions, globalState } from "../../state"
import { food } from "../../state/constants"
import { Food } from "../food";
import * as style from "./style.css";

export const Recommendation = connect('recommendations,basket', actions)(({recommendations, basket, accept, reject, startOver}: any) => {
    const id = recommendations[recommendations.length-1].id;
    const detail = basket.getAttributions(id);
    return <Food id={id} detail={detail} >
        <div class={style.feedback}>
            <button class={style.accept} onClick={accept}>👍</button>
            <button class={style.reject} onClick={reject}>👎</button>
        </div>
</Food>
})

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
