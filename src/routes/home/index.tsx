import { Component, h } from "preact";
import * as style from "./style.css";

interface Props {
    hello: string;
    world: string;
}
export default class Home extends Component<Props> {
    public render({hello}: Props) {
        return (
            <div class={style.home}>
                <h1>Home</h1>
                <p>{hello}</p>
            </div>
        );
    }
}
