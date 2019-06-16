import { Component, h } from "preact";
import * as style from "./style.css";

interface Props {
    id: string;
}

interface State {
    time: number;
    count: number;
}
export default class Photo extends Component<Props, State> {
    public state = {
        time: Date.now(),
        count: 10
    };

    public timer?: number;

    // gets called when this route is navigated to
    public componentDidMount() {
        // start a timer for the clock:
        this.timer = window.setInterval(this.updateTime, 1000);
    }

    // gets called just before navigating away from the route
    public componentWillUnmount() {
        clearInterval(this.timer);
    }

    // update the current time
    public updateTime = () => {
        this.setState({ time: Date.now() });
    };

    public increment = () => {
        this.setState({ count: this.state.count + 1 });
    };
    public render({ id }: Props, /* { time, count }: State */ ) {
        return (
            <div class={style.profile}>
                <h1>Photo: {id}</h1>
                <p>This is a picture of the food with id: {id}.</p>

                <img src={"/assets/images/"+id+".jpg"} />
            </div>
        );
    }
}
