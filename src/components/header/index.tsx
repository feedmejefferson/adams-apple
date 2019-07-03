import { Component, h } from "preact";
import { Link } from "preact-router/match";
import * as style from "./style.css";

export default class Header extends Component {
    public render() {
        return (
            <header class={style.header}>
                <h1><a href="/">Adams 🍎</a></h1>
            </header>
        );
    }
}
