import { globalState } from "../state";

const baseUrl: string = process.env.APPETITE_URL || "";

export class Appetite {

  /*
  {\"step\":1,
  \"chosen\":\"0000295.jpg\",
  \"notChosen\":\"0000114.jpg\",
  \"position\":1,
  \"time\":4780,
  \"hour\":14
  */

  public recommendationAccepted(recommendation: string, accepted: boolean): void {
    if (!baseUrl || !baseUrl.length) { return }
    const state = globalState.getState();
    const branch = state.branch;
    const hour = new Date().getHours();
    const choices = state.choices.map(choice=>({chosen: choice.chosen.id, notChosen: choice.notChosen.id}));
    const app = {recommendation, accepted, branch, hour, choices}
    fetch(baseUrl,{method: 'POST', body: JSON.stringify(app)});
  }
}
