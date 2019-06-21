import { Component, h } from "preact";
import { Food } from "../food";
import * as style from "./style.css";


interface State {
    id: string;
}

interface Props {
    step: number;
    a: number;
    b: number;
}

export class Choice extends Component<Props, State> {
    public render({ step, a, b }: Props) {
        step = !step ? 1 : step; //hack to force strings into numbers
        a = !a ? Math.floor(Math.random()*8+1) : a;
        b = !b ? Math.floor(Math.random()*8+1) : b;
        b = (b!=a) ? b : (b%8+1); 
        return (
            <div class={style.choice} >
                <div class={style.a} >
                    <Food id={a} pairedAgainst={b} step={step} />
                </div>
                <div class={style.b} >
                    <Food id={b} pairedAgainst={a} step={step} />
                </div>
            </div>
        );
    }
}
