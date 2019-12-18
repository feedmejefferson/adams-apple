import { Component, h } from "preact";
import { route } from "preact-router";
import { AppState } from "src/state/types";
import { connect } from "unistore/preact";
import { ActionProps, actions as chefActions } from "../../components/chef-says"
import { Caption } from "../chef-says/types";
import * as style from "./style.css";


const done: Caption = {
    text: <p>Good luck!</p>,
    background: "/"
}
const step2: Caption = {
    text: <p>
        Let us know how we're doing by thumbing down any recommendations you 
        don't want until you see one that you do.
    </p>,
    next: done,
    undismissible: true,
    background: "/intro/2"
}
const step1: Caption = {
    text: <p>Just keep picking whichever food you'd rather eat right now.</p>,
    next: step2,
    undismissible: true,
    background: "/intro/1"
}

const actions = {
  say: chefActions.say
}
  
interface OwnProps { 
  step?: string;
}
type Props = Partial<AppState> & OwnProps & ActionProps;
interface State {}

export const Intro = connect(['ready'], actions )(({ready, step, say }: any) => {
    if(!ready) {return null}
    switch(step) {
        case "2":
            return (
                <div class={style.screen}>
                    <div class={style.recommended}/>
                    <div class={style.feedback}>
                        <button class={style.accept}>👍</button>
                        <button class={style.reject}>👎</button>
                        <div class={style.buttonClicker}>
                            <div class={style.hand}/> 
                        </div>
                    </div>
                </div>
            );

        case "1": 
            return (
                <div class={style.screen}>
                <div class={style.halfScreen}>
                    <div class={style.optA}/>
                </div>
                <div class={style.halfScreen}>
                    <div class={style.optB}/>   
                </div>
                <div class={style.clicker}>
                    <div class={style.hand}/> 
                </div>
                </div>
            );

        default: 
            say(step1);
            return null;
    }
})
