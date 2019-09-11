import { h } from "preact";
import { connect } from "unistore/preact";
// import { actions } from "../../state"
import { UserConsent } from "../../state/types";

// this seems very ugly. maybe one day I'll understand how to make it better
let suppress = true;  // defaulting to true for testing
const GA_TRACKING_ID = process.env.GA_TRACKING_ID;

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

// for some reason this is mounting the state has been initialized
// I don't know why, but it rerenders itself eventually so as long 
// as we don't load the scripts by default and wait until we're sure
// that we have consent it seems to be work. I've had to leave actions
// out of the signature though -- fortunately we don't need any.
export const Tracker = connect('analytics')(({analytics}: any) => {
    // @ts-ignore
    const dnt = (navigator && navigator.doNotTrack) || (window && window.doNotTrack) || (navigator && navigator.msDoNotTrack);
    suppress = dnt || (analytics !== UserConsent.AnalyticsAllowed)
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

})


