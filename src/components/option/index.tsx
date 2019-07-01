import { Component, h } from "preact";
import { IndexedTree } from "../../state/tree";
import { Food } from "../food";
import * as style from "./style.css";

interface State {
    step: number;
    branch: number;
    id: string;
    pairedAgainst: string;
    tree: IndexedTree;
}

interface Props {
    step: number;
    branch: number;
    id: string;
    pairedAgainst: string;
    tree: IndexedTree;
}


export class Option extends Component<Props, State> {
    public state: State;
    constructor(props: Props) {
        super(props);
        this.state={...props};

    }
    public handleClick = () => {
        const nextStep = (this.state.step*1) + 1;
        if(this.state.tree.get(this.state.branch)) {
            // this is a terminal branch
            window.location.href=`/food/${this.state.id}`;
        } else {
            window.location.href=`/choice?step=${nextStep}&branch=${this.state.branch}`;
        }
        // @ts-ignore
        gtag('event', 'selection', {
            'event_category': 'chosen',
            'event_label': `/food/${this.state.id}`,
            'value': 1
          });
        // @ts-ignore
        gtag('event', 'selection', {
            'event_category': 'notChosen',
            'event_label': `/food/${this.state.pairedAgainst}`,
            'value': 1
          });
        
    }
    public render({ step, id }: Props) {
        const nextStep = (this.state.step*1) + 1;
        return (
            <Food 
            onClick={this.handleClick}
            id={id} 
             />
        );
    }
}
