import { Basket, getRandomSeed } from "feedme-trees";
// TODO: Need to figure out how to make this build time variable based on theme
import coreBasket from '../../remote-assets/meta/basket.core.json';
import { AppState, Dilemma, Food, UserConsent } from './types';

export function dilemma(aId: string, bId: string): Dilemma {
    return {a:food(aId), b:food(bId)}
}
export function randomDilemma(basket: Basket, branch: number): Dilemma {
    const seed = getRandomSeed();
    const aBranch = branch * 2;
    const bBranch = aBranch + 1;
    return dilemma(basket.relativeAt(aBranch, seed), basket.relativeAt(bBranch, seed))
}
export function newAppState(): AppState {
    // bootstrap initial 8 images for now
    const basket = new Basket(coreBasket);
    const firstDilemma = randomDilemma(basket, 1);
    return {basket, branch: 1, dilemma: firstDilemma, recommendations: [], choices:[], analytics: UserConsent.Unknown }
} 

export const EMPTY_FOOD = {
    title: "",
    originTitle: "",
    originUrl: "",
    license: "",
    licenseUrl: ""
}

export const food = (id: string):Food => {
    return {id};
}

