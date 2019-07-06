import { Component, h } from "preact";
import { connect } from "unistore/preact";
import { actions } from "../../state"
import * as style from "./style.css";

export const Header = connect([], actions)(({startOver}: any) =>         
<header class={style.header}>
<h1><a href="#" onClick={startOver}>Adams 🍎</a></h1>
</header>
)

