import { Component, h } from "preact";
import * as style from "./style.css";

interface State {
    id: string;
}

interface Props {
    id: string;
}

export class Food extends Component<Props, State> {
    public render({ id }: Props) {
        return (
            <button 
            onClick={e => (window.location.href='/')}
            class={style.stuff} 
            style={"background-image: url(/assets/images/" + id + ".jpg)"} 
             />
        );
    }
}
