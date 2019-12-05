import { h } from "preact";
import { route } from "preact-router";
import { connect } from "unistore/preact";
import { ActionProps as ChefActionProps, actions as chefActions } from "../../components/chef-says"
import { actions } from "../../state"
import { AppState, Chef, UserConsent } from "../../state/types";
import * as style from "./style.css";

interface OwnProps { 
}
type Props = Partial<AppState> & OwnProps & ChefActionProps;
interface State {}

const welcomeMessage = <div>
        <h2>Welcome!</h2>
        <p>
            Hi, I'm Chef Jefferson and welcome to Feed Me, Jefferson!
            Feel free to take the quick tutorial, or skip it if you know 
            what you're doing.
        </p>
        <p>
        <a href="/intro/1">Continue to Tutorial...</a>
        </p>
        <p>
        <a href="/">Skip...</a>
        </p>
    </div>

const consent = <div>
        <h2>Cookies</h2>
        <p>
            No problem, but before I go, I just wanted to say
            that we use cookies and Google Analytics 
            to collect usage details and improve the site.
        </p>
        <button class={style.accept}>Ok! not working</button>
        <button class={style.decline}>Please don't</button>
    </div>

export const Welcome = connect('analytics', chefActions )(({ analytics, say }: any) => {
    if(analytics !== UserConsent.Unknown) { return null }
    const undissmissible = () => {say(consent,undissmissible,()=>{route("/intro/1")})}
    say(welcomeMessage,undissmissible,()=>{route("/intro/1")})
    return null
}) 

// export default connect<OwnProps, State, AppState, any>('analytics', actions)(Welcome);