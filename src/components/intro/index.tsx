import { Component, h } from "preact";
import { route } from "preact-router";
import { connect } from "unistore/preact";
import { ActionProps, actions as chefActions } from "../../components/chef-says"
import { AppState, UserConsent } from "../../state/types";
import { Caption } from "../chef-says/types";
import * as style from "./style.css";


const done: Caption = {
    text: <p>Good luck!</p>,
    background: "/"
}
const consent: Caption = {
    text: <p>
        Great! One last thing. 
        We use cookies and Google Analytics 
        to collect usage details and improve the site.
    </p>,    
    next: [
        {display: "Fine by me!", caption: done, sideEffects: ()=>({analytics: UserConsent.AnalyticsAllowed})}, 
        {display: "Please Don't", caption: done, sideEffects: ()=>({analytics: UserConsent.NoTracking})}
    ],
    undismissible: true
} 
const step4: Caption = {
    text: <p>
        If you liked a food, I'll be happy to google recipes or delivery for you. 
        Click the pan for recipes or the delivery truck for delivery options near you.
    </p>,
    next: consent,
    undismissible: true,
    background: "/intro/4"
}
const step3: Caption = {
    text: <p>Give a thumbs up when you see what you want. If you don't want anything, I'll start over.</p>,
    next: step4,
    undismissible: true,
    background: "/intro/3"
}
const step2: Caption = {
    text: <p>Next I'll try to guess what you're hungry for. If I’m wrong, thumb down any foods you don't want.</p>,
    next: step3,
    undismissible: true,
    background: "/intro/2"
}
export const step1: Caption = {
    text: <p>First I'll show you some combinations of food. Pick whichever food you'd rather eat right now.</p>,
    next: step2,
    undismissible: true,
    background: "/intro/1"
}


export const Intro = ({ step }: any) => {
    switch(step) {
        case "4":
            return (
                <div class={`${style.screen} ${style.swap}`}>
                    <div class={style.noOverflow}>
                        <div class={style.goodRecommendation}/>
                    </div>
                    <div class={style.feedback}>
                        <button class={style.accept}>👍</button>
                        <button class={style.reject}>👎</button>
                        <div class={style.handOnGreen}>
                            <div class={style.hand}/> 
                        </div>
                    </div>
                    <div class={style.procurement}>
                        <button class={style.cook}>🍳</button>
                        <button class={style.deliver}>🚚</button>
                    </div>
                </div>
            );

        case "3":
            return (
                <div class={style.screen}>
                    <div class={style.noOverflow}>
                        <div class={style.goodRecommendation}/>
                    </div>
                    <div class={style.feedback}>
                        <button class={style.accept}>👍</button>
                        <button class={style.reject}>👎</button>
                        <div class={style.handToGreen}>
                            <div class={style.hand}/> 
                        </div>
                    </div>
                </div>
            );

        case "2":
            return (
                <div class={style.screen}>
                    <div class={style.noOverflow}>
                        <div class={style.badRecommendation}/>
                    </div>
                    <div class={style.feedback}>
                        <button class={style.accept}>👍</button>
                        <button class={style.reject}>👎</button>
                        <div class={style.handToRed}>
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

            return null;
    }
}
