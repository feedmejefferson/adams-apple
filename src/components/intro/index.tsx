import { Component, h } from "preact";
import { route } from "preact-router";
import { AppState } from "src/state/types";
import { connect } from "unistore/preact";
import { actions as chefActions } from "../../components/chef-says"
import * as style from "./style.css";

interface ActionProps {
  say: (message: string) => Partial<AppState>
}
  
interface OwnProps { 
  step?: string;
}
type Props = Partial<AppState> & OwnProps & ActionProps;
interface State {}
const step1 = <p>Just keep picking whichever food you'd rather eat right now.</p>

const step2 = <p>Let us know how we're doing by thumbing down any recommendations you don't want until you see one that you do.</p>

export const Intro = connect(['ready'], chefActions )(({ready, step, say }: any) => {
    if(!ready) {return null}
    const say1 = () => say(step1,()=>{say1()},()=>{route('/intro/2')});
    const say2 = () => say(step2,()=>{say2()},()=>{route('/')});
    switch(step) {
        case "2":
            say2()
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
            say1();
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
        return <div/>
    }
})
