import { Component, h } from "preact";

export default class Tracker extends Component {

    render() {
        return (
            <div>
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-142228380-1"></script>
                <script>
                {"window.dataLayer = window.dataLayer || [];"}
                {"function gtag(){dataLayer.push(arguments);}"}
                {"gtag('js', new Date());"}
                {"gtag('config', 'UA-142228380-1');"}
                </script>
            </div> 
        );
    }
}
