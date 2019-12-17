import { Component, h } from "preact";
import { route } from "preact-router";
import { connect } from "unistore/preact";
import { AppState, Chef, ChefPhase } from "../../state/types";
import { Content } from "./content";
import * as style from "./style.css";


export const actions = {
  dismiss: (state: AppState): Partial<AppState> => {
    if(state.chef && state.chef.onDismiss) { return state.chef.onDismiss(state) }
    const phase = (state.chef && state.chef.phase > ChefPhase.Onscreen) ? ChefPhase.Exiting : ChefPhase.Offscreen;
    const chef = state.chef ? {...state.chef, phase } : { phase, saying: "" }
    return { chef };
  },
  talk: (state: AppState): Partial<AppState> => {
    const phase = ChefPhase.Talking;
    const chef = state.chef && {...state.chef, phase }
    return { chef };
  }, 
  next: (state: AppState): Partial<AppState> => {
    if(state.chef && state.chef.onNext) { return state.chef.onNext(state) }
    return(actions.talk(state));
  }, 
  stopTalking: (state: AppState): Partial<AppState> => {
    const phase = ChefPhase.Waiting;
    const chef = state.chef && {...state.chef, phase }
    return { chef };
  },
  say: (state: AppState, message: any, onDismiss?: (state: AppState) => Partial<AppState>, onNext?: (state: AppState) => Partial<AppState> ): Partial<AppState> => {
    // do we need to do anything special if this happens during exiting animation?
    const phase = !state.chef || state.chef.phase < ChefPhase.Onscreen ? ChefPhase.Entering : ChefPhase.Talking;
    const chef = { phase, saying: message, onDismiss, onNext }
    return { chef };
  },
  hardClear: (state: AppState): Partial<AppState> => {
    const phase = ChefPhase.Offscreen;
    const chef = state.chef ? { ...state.chef, phase } : { phase, saying: "" }
        return { chef }
  }


}
export interface ActionProps {
  dismiss: () => Partial<AppState>,
  talk: () => Partial<AppState>,
  stopTalking: () => Partial<AppState>,
  next: () => Partial<AppState>,
  say: (message: any, onDismiss?: (state: AppState) => Partial<AppState>, onNext?: (state: AppState) => Partial<AppState>) => Partial<AppState>
}

interface OwnProps { }
type Props = Partial<AppState> & OwnProps & ActionProps;
interface State {}

export const ChefSays = connect(['chef'], actions )(({chef, dismiss, talk, stopTalking, hardClear, next }: any) => {
  
  // no need to render anything if the chef is completely offscreen/dismissed
  if(chef.phase < ChefPhase.Transitioning) {return null}
  // otherwise... determine which animation class to apply

  const chefAnimation = chef.phase === ChefPhase.Talking ? style.talking :
            chef.phase === ChefPhase.Entering ? style.entering : 
            chef.phase === ChefPhase.Exiting ? style.exiting : 
            null;  
  const handleTransitions = (e: any) => {
    const animation = e.animationName;
    console.log(animation)
    if(animation===style.enter) {talk()}
    if(animation===style.exit) {hardClear()}
    // don't need to handle transitions out of talking, that's handled by pause
    // callback
  }
  return (
    <div class={chef.phase > ChefPhase.Onscreen ? style.onscreen : style.transitioning }>
      <div class={style.coverScreen} onClick={dismiss} />
      <div 
        class={`${style.chefBox} ${chefAnimation}`} 
        onAnimationEnd={e=>handleTransitions(e)}>
      <div 
        class={`${style.chefSprite} ${chef && chef.phase === ChefPhase.Talking && style.talking}`}/>
        <div class={style.speechBubble}>
            {chef.phase >= ChefPhase.Onscreen && <Content onResume={talk} onPause={stopTalking} onComplete={next}>{chef.saying}</Content>}
        </div>
      </div>
    </div>
      );
})

// export default connect<OwnProps, State, AppState, ActionProps>('chef')(ChefSays);
export const SaySomething = connect('', actions )(({ message, say }: any) => {
  console.log("say it!")
  setTimeout(()=>{say(message || <p>I really <strong>love</strong> broccoli. seriously, what if there was a hell of a lot more text here to have to fit in this stupid little box.</p>)},1000)
  return <div/>;
})