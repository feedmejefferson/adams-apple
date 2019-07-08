import { Provider} from "unistore/preact";
import { globalState } from "../state";
import { AppState } from "../state/types"

import { Component, h } from "preact";
import { Route, Router, RouterOnChangeArgs } from "preact-router";

import { DilemmaRoute } from "./dilemma";
import { Food } from "./food";
import { Header } from "./header";
import { ProcurementRoute } from "./procurement"
import { RecRoute } from "./recommendation"
import { StartRoute } from "./start-route";
import Tracker from "./tracker";

// globalState.subscribe((state: AppState) => console.log(state));

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
                        <Route path="/" component={StartRoute} />
                        <Route path="/choice" component={DilemmaRoute} />
                        <Route path="/recommendation" component={RecRoute} />
                        <Route path="/feedme" component={ProcurementRoute} />
                        <Route path="/food/:id" component={Food} />
                    </Router>
                </div>
            </Provider>
        );
    }
}
