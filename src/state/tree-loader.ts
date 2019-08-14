import { Basket, depth } from "feedme-trees";
import { Store } from "unistore";
import { globalState } from ".";
import { AppState } from "./types";

/*
How frequently we should load new baskets. We need a better way
to do this -- the core basket should indicate somehow at what branches
baskets should be loaded, but for now I'm just hardcoding this here.
This doesn't account for the possibility of out of order loading -- again,
this should probably be pushed up into the basket logic -- for instance If 
somebodygets a link from a friend and that link drops them into branch 16, 
but they've never expanded branch 4...
*/
const basketDepthFrequency = 2;

export function childPartials(branch: number): number[] {
    const d = depth(branch);
    if(d % basketDepthFrequency === 0) {

    }
//    const levelsToNext = partialDepth - (depth % partialDepth);
//    const numberOfBranches = Math.pow(2,levelsToNext);
//    const firstBranch = branch * numberOfBranches;
//    return Array.from(Array(numberOfBranches).keys()).map(x => (x + firstBranch));
return [1]
}

const basketUrl = (branch: number) => (`/assets/meta/basket.${branch}.json`)

// load the bootstrap partial tree syncronously

const noResponse = Error("no response");

function updateBasket(branch: number): Promise<void> {
    return fetch(basketUrl(branch))
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

    const d = depth(branch);
    if(d % basketDepthFrequency === 0) {
        updateBasket(branch)

    }
       
}
