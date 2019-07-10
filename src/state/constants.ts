import { IndexedTree } from './tree';
import { AppState, Dilemma, Food, FoodDetail, UserConsent } from './types';



export const bootstrapTree: IndexedTree = new IndexedTree({"8":"0000004","9":"0000261","10":"0000997","11":"0000879","12":"0000091","13":"0000473","14":"0000549","15":"0000117"});

export const coreBasket: {[key:string]:FoodDetail;} = {"0000004":{"originUrl":"https://www.pexels.com/photo/461198","license":"Public Domain","descriptiveTags":["mexican food"],"containsTags":["chicken","lime","rice","onion","pepper","tortilla","cheese","burrito"],"id":"0000004","licenseUrl":"https://creativecommons.org/publicdomain/","title":"Chicken Burrito","originTitle":"Tacos With Lime","isTags":["Chicken Burrito"]}
,"0000261":{"id":"0000261","licenseUrl":"https://creativecommons.org/publicdomain/","title":"Chicken and Broccoli","originTitle":"Broccoli in Bowl","isTags":["Chicken","Broccoli"],"originUrl":"https://www.pexels.com/photo/262973","license":"Public Domain","descriptiveTags":["Meat","Vegetables"],"containsTags":[]}
,"0000997":{"originUrl":"https://www.pexels.com/photo/350343","license":"Public Domain","descriptiveTags":["Deli","Lunch","Meat","Vegetable","Pork","Pig","beverage"],"containsTags":["bread","toast","coffee"],"id":"0000997","licenseUrl":"https://creativecommons.org/publicdomain/","title":"BLT Sandwich","originTitle":"Sliced Sandwich","isTags":["BLT","Sandwich","Bacon","Lettuce","Tomato"]}
,"0000879":{"containsTags":["Spinach"],"id":"0000879","licenseUrl":"https://creativecommons.org/publicdomain/","title":"Mixed Greens Salad with pomegranate and sprouts","originTitle":"Close Up Photography of Bowl Filled With Spice Seasonings","isTags":["Salad","Mixed Greens","pomegranate","pumpkin seeds","sprouts"],"originUrl":"https://www.pexels.com/photo/628777","license":"Public Domain","descriptiveTags":["Asian","Vegetarian","Vegetables"]}
,"0000091":{"originTitle":"Spinach and Beetroot Salad","isTags":["Spinach salad","beetroot","chicken","salad"],"originUrl":"https://www.pexels.com/photo/5928","license":"Public Domain","descriptiveTags":["vegetarian"],"containsTags":["spinach","vegetables"],"id":"0000091","licenseUrl":"https://creativecommons.org/publicdomain/","title":"Spinach and Beetroot Salad with Chicken"}
,"0000473":{"originTitle":"Close-up of Meal Served in Plate","isTags":["Döner","Döner Kebab","Kebab","French Fries","Fries","Doner","Doner Kebab"],"originUrl":"https://www.pexels.com/photo/248468","license":"Public Domain","descriptiveTags":["meat","vegetables","Turkish"],"containsTags":["beef","bread","tomatoes","potato","cucumber","lettuce","sauce","rotisserie"],"id":"0000473","licenseUrl":"https://creativecommons.org/publicdomain/","title":"Doner Kebab with Fries"}
,"0000549":{"isTags":["Popcorn"],"originUrl":"https://www.pexels.com/photo/33129","license":"Public Domain","descriptiveTags":["Snack","vegetable","vegetarian"],"containsTags":["sweet","salt","macaroons","corn"],"id":"0000549","licenseUrl":"https://creativecommons.org/publicdomain/","title":"Popcorn","originTitle":"Selective Focus Photography of Popcorns"}
,"0000117":{"originTitle":"Strawberry Juice in Focus Photography","isTags":["Strawberries","Smoothie","Juice"],"originUrl":"https://www.pexels.com/photo/161600","license":"Public Domain","descriptiveTags":["beverage","drink","vegetarian"],"containsTags":["berry","fruit"],"id":"0000117","licenseUrl":"https://creativecommons.org/publicdomain/","title":"Strawberry Smoothie"}
}



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
    const tree = bootstrapTree;
    const basket = coreBasket;
    const firstDilemma = randomDilemma(tree, 1);
    return {tree, basket, branch: 1, dilemma: firstDilemma, recommendations: [], choices:[], analytics: UserConsent.Unknown }
} 

export const EMPTY_FOOD = {
    title: "",
    originTitle: "",
    originUrl: "",
    license: "",
    licenseUrl: "",
    containsTags: [],
    isTags: [],
    descriptiveTags: []
}

export const food = (id: string):Food => {
    return {id};
}

