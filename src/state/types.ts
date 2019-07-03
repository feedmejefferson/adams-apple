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
    choices: Choice[],
    analytics?: any
}
export interface Food {
    id: string
}
export function food(id: string): Food {
    return {id}
}
export function dilemma(aId: string, bId: string): Dilemma {
    return {a:food(aId), b:food(bId)}
}
export function newAppState(): AppState {
    // bootstrap initial 8 images for now
    const tree = loadBootstrap();
    const firstDilemma = dilemma(tree.getRandom(2), tree.getRandom(3));
    return {tree, branch: 1, dilemma: firstDilemma, choices:[], analytics: true }
} 