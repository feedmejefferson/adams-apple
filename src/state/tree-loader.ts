import { Store } from "unistore";
import { globalState } from ".";
import { AppState } from "./types";


const basketUrl = (basketId: string) => (`${process.env.REMOTE_ASSETS}/meta/basket.${basketId}.json`)

const noResponse = Error("no response");

async function updateBasket(branch: number, expansionId: string): Promise<void> {
    await fetch(basketUrl(expansionId))
    .then(res => res.json())
    .then(json => { 
        const { basket } = globalState.getState();
        globalState.setState({basket: basket.withExpansion(json)});
        // precache the images for the basket
        // Object.keys(json.attributions)
        //     .map(key => `${process.env.REMOTE_ASSETS}/images/${key}.jpg`)
        //     .reduce((previousPromise, img) => { 
        //         return previousPromise
        //         .then(res => {console.log(res);fetch(img, { mode: 'cors' });})
        //         .catch(err => { console.log(`couldn't load ${img}: ${err}`); })
        //         .finally(() => { console.log("in finally");fetch(img, { mode: 'cors' }); })
        //     }, Promise.resolve());
    }).catch(err => {if(err===noResponse) {
//        console.log("empty respose, ignoring");
    }else{
        console.log(basketUrl(expansionId),err);
        throw Error(`problems loading partial: ${err}`);
    }})
}
// asyncronously load and expand requested branches in the background
// update the store's global state when they've loaded
export async function loadBranch(store: Store<AppState>, branch: number) {
    while(store.getState().basket.hasExpansion(branch)) {
        const expansion = store.getState().basket.hasExpansion(branch)
        await updateBasket(branch, expansion);
    }
}

export async function prefetchImages(foodIds: string[]) {
    foodIds.map(key => `${process.env.REMOTE_ASSETS}/images/${key}.jpg`)
    .reduce((previousPromise, img) => { 
        return previousPromise
//        .then(res => {fetch(img, { mode: 'cors' });})
        .catch(err => { console.log(`couldn't load ${img}: ${err}`); })
        .finally(() => { fetch(img, { mode: 'cors' }); })
    }, Promise.resolve());

}