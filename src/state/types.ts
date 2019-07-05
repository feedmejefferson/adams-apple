import { IndexedTree } from "./tree";

export enum Phase {
    DILEMMA,
    RECOMMENDATION,
    PROCUREMENT
}

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
    phase: Phase,
    dilemma: Dilemma,
    recommendations: Food[], 
    choices: Choice[],
    analytics?: any
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
