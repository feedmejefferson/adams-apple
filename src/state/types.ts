import { IndexedTree } from "./tree";

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
    choices: Choice[]
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
    const tree = new IndexedTree(JSON.parse('{"8":"0000004","9":"0000261","10":"0000997","11":"0000879","12":"0000091","13":"0000473","14":"0000549","15":"0000117"}'));
    const firstDilemma = dilemma(tree.getRandom(2), tree.getRandom(3));
    return {tree, branch: 1, dilemma: firstDilemma, choices:[]}
} 