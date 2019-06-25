import { Component, h } from "preact";
import { Option } from "../option";
import * as style from "./style.css";


interface State {
    id: string;
}

interface Props {
    branch: number;
    step: number;
    a: number;
    b: number;
}

export class Selection extends Component<Props, State> {
    public render({ step, branch, a, b }: Props) {
        console.log(a,b,step);
        step = !step ? 1 : step; // hack to force strings into numbers
        branch = !branch ? 1 : branch; // hack to force strings into numbers
        a = !a ? Math.floor(Math.random()*8+1) : a;
        b = !b ? Math.floor(Math.random()*8+1) : b;
        b = (b!==a) ? b : (b%8+1); 
        return (
            <div class={style.choice} >
                <div class={style.a} >
                    <Option id={a} pairedAgainst={b} step={step} branch={branch*2} />
                </div>
                <div class={style.b} >
                    <Option id={b} pairedAgainst={a} step={step} branch={branch*2+1}/>
                </div>
            </div>
        );
    }
}
