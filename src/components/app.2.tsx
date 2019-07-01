import { Component, h } from "preact";
import { Provider} from "unistore/preact";
import { globalState } from "../state";
import { AppState } from "../state/types"
import { Dilemma } from "./dilemma"


globalState.subscribe((state: AppState) => console.log(state));

interface AppOwnProps {
    // none
}

interface AppOwnState {
    // none
}

interface InjectedProps {
    count: number;
}

// const mapStateToProps = (store: Appetite, own: AppOwnProps) => {
//     return {count: store.count};
// };

// const connec = connect<AppOwnProps, AppOwnState, Appetite, InjectedProps>(mapStateToProps, actions);

// const App = connect(['count', 'dilemma'], actions)(({count, dilemma, reverse, chooseA, chooseB}: any) => 
//     <div>
//         <Food id={dilemma.a.id} onClick={chooseA} />
//         <Food id={dilemma.b.id} onClick={chooseB} />
//         <button onClick={reverse}>Reverse</button>
//     </div>
// )

const App = () =><div>
    <Dilemma/>
</div>
    
export default () => (
            <Provider store={globalState}>
                <App/>

            </Provider>
        );
