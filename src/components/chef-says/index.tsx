import { Component, h } from "preact";
import { route } from "preact-router";
import { connect } from "unistore/preact";
import { AppState, Chef, ChefPhase } from "../../state/types";
import * as style from "./style.css";


export const actions = {
  dismiss: (state: AppState): Partial<AppState> => {
    if(state.chef && state.chef.onDismiss) { return state.chef.onDismiss(state) }
    const phase = ChefPhase.Offscreen;
    const chef = state.chef ? {...state.chef, phase } : { phase, saying: "" }
    return { chef };
  },
  talk: (state: AppState): Partial<AppState> => {
    console.log("Dance monkey, dance!")
    const phase = ChefPhase.Talking;
    const chef = state.chef && {...state.chef, phase }
    return { chef };
  }, 
  next: (state: AppState): Partial<AppState> => {
    if(state.chef && state.chef.onNext) { return state.chef.onNext(state) }
    return(actions.talk(state));
  }, 
  stopTalking: (state: AppState): Partial<AppState> => {
    console.log("Stop Dancing!")
    const phase = ChefPhase.Onscreen;
    const chef = state.chef && {...state.chef, phase }
    return { chef };
  },
  say: (state: AppState, message: any, onDismiss?: (state: AppState) => Partial<AppState>, onNext?: (state: AppState) => Partial<AppState> ): Partial<AppState> => {
    const phase = !state.chef || state.chef.phase === ChefPhase.Offscreen ? ChefPhase.Onscreen : ChefPhase.Talking;
    const chef = { phase, saying: message, onDismiss, onNext }
    console.log(chef)
    return { chef };
  }


}
export interface ActionProps {
  dismiss: () => Partial<AppState>,
  talk: () => Partial<AppState>,
  stopTalking: () => Partial<AppState>,
  next: () => Partial<AppState>,
  say: (message: string, onDismiss?: (state: AppState) => Partial<AppState>, onNext?: (state: AppState) => Partial<AppState>) => Partial<AppState>
}

interface OwnProps { }
type Props = Partial<AppState> & OwnProps & ActionProps;
interface State {}

export const ChefSays = connect(['chef'], actions )(({chef, dismiss, talk, stopTalking, next }: any) => {
// export const ChefSays = ({ chef }: Props, {}: State) => {
//  if(!chef || chef.phase === ChefPhase.Offscreen) { return <div/>}
// if(!chef) {return <div/>}
    return (
        <div 
          class={`${style.chefBox} ${(!chef || chef.phase === ChefPhase.Offscreen) ? style.offscreen : style.onscreen}`} 
          onTransitionEnd={e=>{e.stopPropagation();if(chef.phase===ChefPhase.Onscreen){talk()}}}>
        <div 
          class={`${style.chefSprite} ${chef && chef.phase === ChefPhase.Talking && style.talking}`}
          onClick={dismiss} onAnimationEnd={e=>{e.stopPropagation();stopTalking()}}/>
        <div class={style.instructions}>
          <div class={style.speechBubble}>
            <div class={style.content} onClick={next}>
              { chef && chef.saying }
          </div>
        </div>
        </div>
        </div>
        );
})

// export default connect<OwnProps, State, AppState, ActionProps>('chef')(ChefSays);