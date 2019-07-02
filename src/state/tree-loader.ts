import { Store } from "unistore";
import { IndexedTree } from "./tree";
import { AppState } from "./types";

/*
The depth of partial trees. The number of nodes in each partial will
be two raised to this power. This indicates which branches new partials
need to be loaded at.
*/
const partialDepth = 3;

/*
The eagerness with which we load new partials. Zero would indicate that we 
wait until we've reached a terminal node to load the branch, but at the
very best that would result in a delay in showing the user a dilemma for
the branch and at the worst it would result in us thinking that we were on
a terminal node. Higher eagerness indicates that we have to load more partials
(two raised to the power of the eagerness), but it means that we have more 
variety of options to show for dilemmas that approach the end of a partial
branch.
*/
const eagerness = 2;

export function childPartials(branch: number): number[] {
    const depth = Math.floor(Math.log2(branch));
    const levelsToNext = partialDepth - (depth % partialDepth);
    const numberOfBranches = Math.pow(2,levelsToNext);
    const firstBranch = branch * numberOfBranches;
    return Array.from(Array(numberOfBranches).keys()).map(x => (x + firstBranch));

}

const partialUrl = (branch: number) => (`/assets/meta/indexed-tree.${branch}.json`)

// load the bootstrap partial tree syncronously
export function loadBootstrap(): IndexedTree {
    return new IndexedTree(JSON.parse('{"8":"0000004","9":"0000261","10":"0000997","11":"0000879","12":"0000091","13":"0000473","14":"0000549","15":"0000117"}'));
}

// asyncronously load and expand requested branches in the background
// update the store's global state when they've loaded
export function loadBranch(store: Store<AppState>, branch: number) {

    /* 
    first we have to make sure we haven't somehow landed on a branch
    outside of our expanded tree -- this could happen if the user clicks
    on a url that takes them straight into a branch thats deeper than the
    bootstrap loader loads.
    */
   const { tree } = store.getState();
   const nodeToExpand = tree.ancestorNodeId(branch);
   if(nodeToExpand) { 
    fetch(partialUrl(nodeToExpand))
    // for now we'll just filter out non existent responses
    .then(res => {if(!res.ok){throw Error()} return res; })
    .then(res => res.json())
    .then(json => { 
// tslint:disable-next-line: no-shadowed-variable
        const { tree } = store.getState();
        store.setState({tree: tree.expandBranch(nodeToExpand, json)});
    })
    // finally, keep calling recursively until we've caught up
    .then(() => loadBranch(store, branch));
    return;

   }

    // now we can eager load to expand our current branch
    // we should eager load if we are less than the eagerness level
    // number of steps away from the first child node
    // tslint:disable-next-line: no-bitwise
    if(((tree.firstChildNodeId(branch)/branch)>>(eagerness+1))) {
        // we are at least eagerness clicks away from a terminal node
        // so we don't need to expand the branch
        return;
    }
    childPartials(branch)
    .forEach(b => {
        fetch(partialUrl(b))
        // for now we'll just filter out non existent responses
        .then(res => {if(!res.ok){throw Error()} return res; })
        .then(res => res.json())
        .then(json => { 
// tslint:disable-next-line: no-shadowed-variable
            const { tree } = store.getState();
            store.setState({tree: tree.expandBranch(b, json)});
        })
    });
        
}
