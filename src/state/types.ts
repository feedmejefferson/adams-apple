import { IndexedTree } from "./tree";

export enum Side { 
    A = 0,
    B = 1
}

export enum UserConsent {
    Unknown = 0,
    NoTracking = 1,
    AnalyticsAllowed = 2
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
    basket: FoodBasket,
    branch: number,
    dilemma: Dilemma,
    recommendations: Food[], 
    choices: Choice[],
    analytics: UserConsent
}

export interface Food  {
    id: string;
}

export interface FoodDetail  {
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

export interface FoodBasket {
    [key:string]:FoodDetail;
}
