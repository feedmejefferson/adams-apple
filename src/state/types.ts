import { Basket } from "@feedmejefferson/feedme-trees";
import { Attribution } from "@feedmejefferson/feedme-trees/dist/types";
import { Chef } from "../components/chef-says/types";

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
    version?: number,
    basket: Basket,
    branch: number,
    dilemma: Dilemma,
    recommendations: Food[], 
    choices: Choice[],
    analytics: UserConsent,
    chef?: Chef
    ready: boolean
}

export interface Food  {
    id: string;
}

export interface FoodDetail extends Attribution {
    position?: string;
}

