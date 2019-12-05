import { Basket } from "@feedmejefferson/feedme-trees";
import { Attribution } from "@feedmejefferson/feedme-trees/dist/types";

export enum Side { 
    A = 0,
    B = 1
}

export enum UserConsent {
    Unknown = 0,
    NoTracking = 1,
    AnalyticsAllowed = 2
}

export enum ChefPhase {
    Offscreen = 0,
    Entering = 1,
    Onscreen = 2,
    Talking = 3,
    Exiting = 4,
}

export interface Dilemma {
    a: Food,
    b: Food
}
export interface Choice {
    chosen: Food,
    notChosen: Food
}
export interface Chef {
    phase: ChefPhase,
    saying: any,
    onDismiss?: (state: AppState) => Partial<AppState>,
    onNext?: (state: AppState) => Partial<AppState> 
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
}

export interface Food  {
    id: string;
}

export interface FoodDetail extends Attribution {
    position?: string;
}

