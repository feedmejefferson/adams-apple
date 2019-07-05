import { Component, h } from "preact";
import { food } from "../../state/types";
import { Attribution } from "../attribution";
import * as style from "./style.css";

interface Props {
    id: string;
    onClick?: JSX.EventHandler<MouseEvent>
}


export class Food extends Component<Props> {
    public render({ id, onClick }: Props) {
        const f = food(id);
        const a = Attribution({...f});
        /*
        it's important that the attribution section is rendered before
        the optional button. The button takes up the full space of the
        area, but we don't want clicks on the attribution area to count
        and as long as the attribution is rendered first, it seems to 
        overlay the button and make it not reachable. This may depend on 
        the user agent =(
        */
        return (
            <div 
            class={style.food} 
            style={`background-image: url(/assets/images/${id}.jpg)`} 
            >
                {a}
                { onClick && <button onClick={onClick}>{f.title}</button> }
            </div>
        );
    }
}
