import { Component, h } from "preact";
import { Route, Router, RouterOnChangeArgs } from "preact-router";

import Home from "../routes/home";
import Photo from "../routes/photo";
import Header from "./header";
import { Selection } from "./selection";
import Tracker from "./tracker";

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
            <div id="app">
                <Tracker />
                <Header />
                <Router onChange={this.handleRoute}>
                    <Route path="/" component={Selection} />
                    <Route path="/choice" component={Selection} />
                    <Route path="/food/:id" component={Photo} />
                </Router>
            </div>
        );
    }
}
