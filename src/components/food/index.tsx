import { Component, h } from "preact";
import { globalState } from "../../state";
import { FoodDetail } from "../../state/types";
import { Attribution } from "../attribution";
import * as style from "./style.css";

interface RouteProps {
    id: string;
}

interface Props {
    id: string;
    detail: FoodDetail;
    onClick?: JSX.EventHandler<MouseEvent>;
}

export class Food extends Component<Props> {
    public render({ id, detail, onClick }: Props) {
        const a = Attribution({...detail});
        const backgroundStyle = {
            "background-image": `url(/assets/images/${id}.jpg)`,
            "background-position": detail.position ? detail.position : "center"
        }
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
            style={backgroundStyle}
            >
                {a}
                { onClick && <button class={style.image} onClick={onClick}>{detail && detail.title}</button> }
                {this.props.children}
            </div>
        );
    }
}

export const FoodRoute = ({ id }: RouteProps) => {
    const basket = globalState.getState().basket;
    const detail = basket.getAttributions(id);
    return <Food id={id} detail={detail} />
}

