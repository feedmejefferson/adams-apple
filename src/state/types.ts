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
    Transitioning = 1,
    Exiting = 2,
    Entering = 3,
    Onscreen = 4,
    Talking = 5,
    Waiting = 6
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
    ready: boolean
}

export interface Food  {
    id: string;
}

export interface FoodDetail extends Attribution {
    position?: string;
}

