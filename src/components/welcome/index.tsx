import { h } from "preact";
import { route } from "preact-router";
import { connect } from "unistore/preact";
import { ActionProps as ChefActionProps, actions as chefActions } from "../../components/chef-says"
import { AppState, UserConsent } from "../../state/types";
import { Caption } from '../chef-says/types';
import { step1 } from '../intro';
import * as style from "./style.css";

interface OwnProps { 
}
type Props = Partial<AppState> & OwnProps & ChefActionProps;
interface State {}

const noConsentAck: Caption = {
    text: <p>No problem, we respect your preference for privacy!</p>
} 
const consentAck: Caption = {
    text: <p>Thanks for your help and hope you find something you like!</p>
} 
const consent: Caption = {
    text: <p>
        No problem, but before I go, I just wanted to say
        that we use cookies and Google Analytics 
        to collect usage details and improve the site.
    </p>,    
    next: [
        {display: "Fine by me!", caption: consentAck, sideEffects: ()=>({analytics: UserConsent.AnalyticsAllowed})}, 
        {display: "Please Don't", caption: noConsentAck, sideEffects: ()=>({analytics: UserConsent.NoTracking})}
    ],
    undismissible: true
} 
const welcomeMessage: Caption = {
    text: <p>
        Hungry? Not sure what you want? I can help! 
        Take the tutorial, or skip it if you’re ready.
        </p>,
    next: [{display: "OK", caption: step1}, {display: "Skip", caption: consent}],
    undismissible: true
}


export const Welcome = connect('analytics, ready', chefActions )(({ analytics, ready, say }: any) => {
    if(!ready) { 
        // we can't trust the analytics setting yet since it might still need
        // to be rehydrated from local storage
        return null; 
    }
    if(analytics && analytics !== UserConsent.Unknown) { 
        // we know the user has visited us before and provided an response
        // for tracking consent, so we don't need to welcome them again
        return null 
    }
    // we can be confident that this is the users first visit with this browser
    // (or they've cleared their storage or they're running from private mode...)
    setTimeout(say(welcomeMessage),3000)
    return null
}) 

// export default connect<OwnProps, State, AppState, any>('analytics', actions)(Welcome);