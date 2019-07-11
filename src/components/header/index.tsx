import { Component, h } from "preact";
import { Link } from "preact-router";
import { connect } from "unistore/preact";
import { actions } from "../../state"
import { Feedback } from "../feedback";
import * as style from "./style.css";

export const Header = connect([], actions)(({startOver}: any) =>         
<header class={style.header}>
<h1><Link href="/">Adams 🍎</Link></h1>
<Feedback />
</header>
)

