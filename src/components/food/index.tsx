import { Component, h } from "preact";
import * as style from "./style.css";

interface State {
    step: number;
    id: number;
    pairedAgainst: number;
}

interface Props {
    step: number;
    id: number;
    pairedAgainst: number;
}


export class Food extends Component<Props, State> {
    public state: State;
    constructor(props: Props) {
        super(props);
        this.state={...props};

    }
    public handleClick = () => {
        const nextStep = (this.state.step*1) + 1;
        window.location.href=`/choice/${nextStep}/`;
        //@ts-ignore
        gtag('event', 'selection', {
            'event_category': 'chosen',
            'event_label': `/food/${this.state.id}`,
            'value': 1
          });
        //@ts-ignore
        gtag('event', 'selection', {
            'event_category': 'notChosen',
            'event_label': `/food/${this.state.pairedAgainst}`,
            'value': 1
          });
        
    }
    public render({ step, id }: Props) {
        const nextStep = (this.state.step*1) + 1;
        return (
            <button 
            onClick={this.handleClick}
            class={style.stuff} 
            style={`background-image: url(/assets/images/${id}.jpg)`} 
             />
        );
    }
}
