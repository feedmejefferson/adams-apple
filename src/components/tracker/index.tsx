import { Component, h } from "preact";
import { globalState } from "../../state"
import { AppState } from "../../state/types";

// this seems very ugly. maybe one day I'll understand how to make it better
let suppress = false;
const GA_TRACKING_ID = 'UA-142228380-1'

export const pageview = (url: string) => {
    if(suppress){return}
    // @ts-ignore
    window.gtag('config', GA_TRACKING_ID, {
        page_location: url
    });
}

export const event = (action: string, category: string, label?: string, value?: number) => {
    if(suppress){return}
    // @ts-ignore
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value
    });
}

export default class Tracker extends Component {
    public constructor() {
        super()
        // At the very least, let's respect the do not track header for now
        // @ts-ignore
        const dnt = (navigator && navigator.doNotTrack) || (window && window.doNotTrack) || (navigator && navigator.msDoNotTrack);
        if(dnt) { globalState.setState({analytics: !dnt})}
        suppress = !globalState.getState().analytics;
        globalState.subscribe(({analytics}: AppState) => {suppress= !analytics});
    }

    public render() {
        // hack to disable tracking
        if(suppress) {return  <div/>}
        return (
            <div>
                
                <script async={true} src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
                <script>
                { `window.dataLayer = window.dataLayer || []; \
                function gtag(){dataLayer.push(arguments);} \
                gtag('js', new Date()); \
                gtag('config', '${GA_TRACKING_ID}');`}
                </script>
            </div> 
        );
    }
}
