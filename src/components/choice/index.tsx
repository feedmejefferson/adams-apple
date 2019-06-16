import { Component, h } from "preact";
import { Food } from "../food";
import * as style from "./style.css";


interface State {
    id: string;
}

interface Props {
    a: number;
    b: number;
}

export class Choice extends Component<Props, State> {
    public render({ a, b }: Props) {
        a = !a ? Math.floor(Math.random()*8+1) : a;
        b = !b ? Math.floor(Math.random()*8+1) : b;
        b = (b!=a) ? b : (b+1)%8; 
        return (
            <div class={style.choice} >
                <div class={style.a} >
                    <Food id={`${a}`} />
                </div>
                <div class={style.b} >
                    <Food id={`${b}`} />
                </div>
            </div>
        );
    }
}
