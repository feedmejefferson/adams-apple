import { h } from "preact";
import { route } from "preact-router";
import { connect } from "unistore/preact";
import { ActionProps as ChefActionProps, actions as chefActions } from "../../components/chef-says"
import { AppState, UserConsent } from "../../state/types";
import { Caption } from '../chef-says/types';
import * as style from "./style.css";

interface OwnProps { 
}
type Props = Partial<AppState> & OwnProps & ChefActionProps;
interface State {}

const consent: Caption = {
    text: <p>
        No problem, but before I go, I just wanted to say
        that we use cookies and Google Analytics 
        to collect usage details and improve the site.
    </p>,    
    undismissible: true
} 
const welcomeMessage: Caption = {
    text: <p>
        Hi, I'm Chef Jefferson! 
        Feel free to take the quick tutorial, or skip it if you know 
        what you're doing.
        </p>,
    next: consent,
    undismissible: true
}


export const Welcome = connect('analytics, ready', chefActions )(({ analytics, ready, say }: any) => {
    if(!ready || analytics !== UserConsent.Unknown) { return null }
    setTimeout(say(welcomeMessage),2000)
    return null
}) 

// export default connect<OwnProps, State, AppState, any>('analytics', actions)(Welcome);