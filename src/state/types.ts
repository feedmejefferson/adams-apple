import { Basket } from "feedme-trees";
import { Attribution } from "feedme-trees/dist/types";

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
    basket: Basket,
    branch: number,
    dilemma: Dilemma,
    recommendations: Food[], 
    choices: Choice[],
    analytics: UserConsent
}

export interface Food  {
    id: string;
}

export interface FoodDetail extends Attribution {
    position?: string;
}

