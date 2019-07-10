import { h } from "preact";
import { connect } from "unistore/preact";
import { actions } from "../../state"
import { UserConsent } from "../../state/types";
import * as style from "./style.css";

export const ConsentPopup = connect('analytics', actions)(({analytics, consent, noConsent}: any) => {
    // @ts-ignore
    const dnt = (navigator && navigator.doNotTrack) || (window && window.doNotTrack) || (navigator && navigator.msDoNotTrack);
    if(dnt || analytics !== UserConsent.Unknown) { return <div /> } 
    return <div class={style.consent}>
        <h1>Cookies</h1>
        <p>
            We use cookies and Google Analytics 
            to collect usage details and improve the site.
        </p>
        <button class={style.accept} onClick={consent}>Ok!</button>
        <button class={style.decline} onClick={noConsent}>Please don't</button>
    </div>
        
        
})

