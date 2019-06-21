import { Component, h } from "preact";
import { Route, Router, RouterOnChangeArgs } from "preact-router";

import Home from "../routes/home";
import Header from "./header";
import Photo from "../routes/photo";
import { Choice } from "./choice";
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
                    <Route path="/" component={Choice} />
                    <Route path="/choice/:step" component={Choice} />
                    <Route path="/choice/:step/:a/:b" component={Choice} />
                    <Route path="/photos/:id" component={Photo} />
                </Router>
            </div>
        );
    }
}
