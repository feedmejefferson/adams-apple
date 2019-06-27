import { Component, h } from "preact";
import * as style from "./style.css";

interface Props {
    id: string;
    onClick: JSX.EventHandler<MouseEvent>
}


export class Food extends Component<Props> {
    public render({ id, onClick }: Props) {
        return (
            <button 
            onClick={onClick}
            class={style.stuff} 
            style={`background-image: url(/assets/images/${id}.jpg)`} 
             />
        );
    }
}
