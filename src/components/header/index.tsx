import { Component, h } from "preact";
import { Link } from "preact-router";
import { connect } from "unistore/preact";
import { actions } from "../../state"
import { Feedback } from "../feedback";
import * as style from "./style.css";

const siteName = process.env.SITE_NAME;

export const Header = connect([], actions)(({startOver}: any) =>         
<header class={style.header}>
<h1><Link href="/">{siteName}</Link></h1>
<Feedback />
</header>
)

