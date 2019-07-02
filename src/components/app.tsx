import { Provider} from "unistore/preact";
import { globalState } from "../state";
import { AppState } from "../state/types"
import { Dilemma } from "./dilemma"

import { Component, h } from "preact";
import { Route, Router, RouterOnChangeArgs } from "preact-router";

import { CrystalBowl } from "./crystal-bowl";
import { Food } from "./food"
import Header from "./header";
import Tracker from "./tracker";

 globalState.subscribe((state: AppState) => console.log(state));

if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require("preact/debug");
}


export default class App extends Component {
    public currentUrl?: string;
    public handleRoute = (e: RouterOnChangeArgs) => {
        this.currentUrl = e.url;
    };

    public render() {
        return (
            <Provider store={globalState}>
                <div id="app">
                    <Tracker />
                    <Header />
                    <Router onChange={this.handleRoute}>
                        <Route path="/" component={Dilemma} />
                        <Route path="/choice" component={CrystalBowl} />
                        <Route path="/food/:id" component={Food} />
                    </Router>
                </div>
            </Provider>
        );
    }
}
