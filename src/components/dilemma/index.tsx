import { Component, h } from "preact";
import { connect } from "unistore/preact";
import { actions } from "../../state"
// import { IndexedTree } from "../crystal-bowl/tree";
// import { Option } from "../option";
import { Food } from "../food";
import * as style from "./style.css";

export const Dilemma = connect('dilemma', actions)(({dilemma, chooseA, chooseB, expandBranch}: any) => 
    <div class={style.choice}>
        <div class={style.a}>
            <Food id={dilemma.a.id} onClick={() => {chooseA();expandBranch();}} />
        </div>
        <div class={style.a}>
           <Food id={dilemma.b.id} onClick={() => {chooseB();expandBranch();}} />
        </div>
    </div>
)

// interface State {
//     id: string;
// }

// interface Props {
//     branch: number;
//     step: number;
//     a: string;
//     b: string;
//     tree: IndexedTree;
// }

// export class Dilemma extends Component<Props, State> {
//     public render({ step, branch, a, b, tree }: Props) {
//         step = !step ? 1 : step; // hack to force strings into numbers
//         branch = !branch ? 1 : branch; // hack to force strings into numbers
//         return (
//             <div class={style.choice} >
//                 <div class={style.a} >
//                     <Option id={a} pairedAgainst={b} step={step} branch={branch*2} tree={tree}/>
//                 </div>
//                 <div class={style.b} >
//                     <Option id={b} pairedAgainst={a} step={step} branch={branch*2+1} tree={tree}/>
//                 </div>
//             </div>
//         );
//     }
// }
