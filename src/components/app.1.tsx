import { Component, h } from "preact";
import { Route, Router, RouterOnChangeArgs } from "preact-router";
import createStore, { Store } from "unistore";
import { connect, Provider } from "unistore/preact";

// import { Reverse } from "../actions";
// import { handleReverse, MoodReducer } from "../state";
import { Mood } from "../state/types";
import { CrystalBowl } from "./crystal-bowl";
import { Food } from "./food"
import Header from "./header";
import Tracker from "./tracker";

if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require("preact/debug");
}

// function createReducerStore(state: Mood<string>, reducer: MoodReducer<string>): Store<Mood<string>> {
//     const store1 = createStore(state)
//     // our reducer is actually an action (they're the same thing!):
//     const reduce1 = store1.action(reducer)
//     // replacing store.action lets us change how connect() works:
//     store1.action = fn => (...args) => reduce1(fn(state, ...args))
//     return store1
//   }

// const store = createReducerStore({
//     dilemma: {a: '1', b: '2'},
//     choices: []
//   }, handleReverse);

export default class App extends Component {
    public currentUrl?: string;
    public handleRoute = (e: RouterOnChangeArgs) => {
        this.currentUrl = e.url;
    };

    public render() {
        return (
//            <Provider store={store}>
                <div id="app">
                    <Tracker />
                    <Header />
                    <Router onChange={this.handleRoute}>
                        <Route path="/" component={CrystalBowl} />
                        <Route path="/choice" component={CrystalBowl} />
                        <Route path="/food/:id" component={Food} />
                    </Router>
                </div>
//            </Provider>
        );
    }
}
