import { Basket, depth } from "feedme-trees";
import { Store } from "unistore";
import { globalState } from ".";
import { AppState } from "./types";


const basketUrl = (basketId: string) => (`/assets/meta/basket.${basketId}.json`)

const noResponse = Error("no response");

function updateBasket(branch: number, expansionId: string): Promise<void> {
    return fetch(basketUrl(expansionId))
    .then(res => res.json())
    .then(json => { 
        const { basket } = globalState.getState();
        globalState.setState({basket: basket.withExpansion(json)});
    }).catch(err => {if(err===noResponse) {
//        console.log("empty respose, ignoring");
    }else{
        throw Error("problems loading partial");
    }})
}
// asyncronously load and expand requested branches in the background
// update the store's global state when they've loaded
export function loadBranch(store: Store<AppState>, branch: number) {
    const expansion = store.getState().basket.hasExpansion(branch);
    if(expansion) {
        updateBasket(branch, expansion)
    }       
}
