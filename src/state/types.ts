import { Tracing } from "trace_events";
import { basket } from "./core-basket";
import { IndexedTree } from "./tree";
import { loadBootstrap } from "./tree-loader";

export interface Dilemma {
    a: Food,
    b: Food
}
export interface Choice {
    chosen: Food,
    notChosen: Food
}
export interface AppState {
    tree: IndexedTree,
    branch: number,
    dilemma: Dilemma,
    recommendations: Food[], 
    choices: Choice[],
    analytics?: any
}
// export interface Food {
//     id: string
// }
// export function food(id: string): Food {
//     return {id}
// }

export function dilemma(aId: string, bId: string): Dilemma {
    return {a:food(aId), b:food(bId)}
}
export function randomDilemma(tree: IndexedTree, branch: number): Dilemma {
    const seed = Math.random();
    const aBranch = branch * 2;
    const bBranch = aBranch + 1;
    return dilemma(tree.getRandom(aBranch, seed), tree.getRandom(bBranch, seed))
}
export function newAppState(): AppState {
    // bootstrap initial 8 images for now
    const tree = loadBootstrap();
    const firstDilemma = randomDilemma(tree, 1);
    return {tree, branch: 1, dilemma: firstDilemma, recommendations: [], choices:[], analytics: true }
} 

export interface Food  {
    id: string;
    title: string;
    originTitle: string;
    originUrl: string;
    author?: string;
    authorProfileUrl?: string;
    license: string;
    licenseUrl: string;
    containsTags: string[];
    isTags?: string[];
    descriptiveTags?: string[];
}
export const EMPTY = {
    title: "",
    originTitle: "",
    originUrl: "",
    license: "",
    licenseUrl: "",
    author: "",
    authorProfileUrl: "",
    containsTags: [],
    isTags: [],
    descriptiveTags: []
}



export const food = (id: string):Food => {
    const f = basket[id];
    return f ? f : { id, ...EMPTY};
}
