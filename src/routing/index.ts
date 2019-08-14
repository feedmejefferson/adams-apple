import { globalState } from "../state";
import { randomDilemma } from "../state/constants";
import { Side } from "../state/types";

export const routeForBranch = (side: number): string => {
    const state = globalState.getState();
    const basket = state.basket;

    // side A = 0/falsy, B = 1/truthy
    const branch = state.branch*2+side;
    
    if(basket.branchIsTerminal(branch)) {
        const likes = state.recommendations
        .map(f => f.id)
        .filter(i => (i !== state.dilemma.a.id && i !== state.dilemma.b.id));
        likes.push(side === Side.A ? state.dilemma.a.id : state.dilemma.b.id);
        
        // terminal branch, route to recommendation
        return(`/recommendation?likes=${likes.join("~")}`);
    } 

    const dilemma = randomDilemma(basket, branch);
    return(`/choice/?branch=${branch}&a=${dilemma.a.id}&b=${dilemma.b.id}`);
}
