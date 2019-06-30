import { Component, h } from "preact";
import { Route, Router, RouterOnChangeArgs } from "preact-router";
import createStore from "unistore";
import { connect, Provider } from "unistore/preact";

import Home from "../routes/home";
import Photo from "../routes/photo";
import { CrystalBowl } from "./crystal-bowl";
import { Dilemma } from "./dilemma";
import { Food } from "./food"
import Header from "./header";
import Tracker from "./tracker";

if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require("preact/debug");
}

const store = createStore({
    branch: 1,
    tree: {}
  });

export default class App extends Component {
    public currentUrl?: string;
    public handleRoute = (e: RouterOnChangeArgs) => {
        this.currentUrl = e.url;
    };

    public render() {
        return (
            <Provider store={store}>
                <div id="app">
                    <Tracker />
                    <Header />
                    <Router onChange={this.handleRoute}>
                        <Route path="/" component={CrystalBowl} />
                        <Route path="/choice" component={CrystalBowl} />
                        <Route path="/food/:id" component={Food} />
                    </Router>
                </div>
            </Provider>
        );
    }
}
