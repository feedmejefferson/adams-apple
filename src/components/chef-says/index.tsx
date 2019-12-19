import { Component, h } from "preact";
import { route } from "preact-router";
import { connect } from "unistore/preact";
import { AppState } from "../../state/types";
import { Content } from "./content";
import * as style from "./style.css";
import { Caption, Chef, ChefPhase, ForwardingFunction, SideEffect } from "./types";


export const actions = {
  dismiss: (state: AppState): Partial<AppState> => {
    const phase = (state.chef && state.chef.phase > ChefPhase.Onscreen) ? ChefPhase.Exiting : ChefPhase.Offscreen;
    const chef = { phase }
    return { chef };
  },
  talk: (state: AppState): Partial<AppState> => {
    const phase = ChefPhase.Talking;
    const chef = state.chef && {...state.chef, phase }
    return { chef };
  }, 
  stopTalking: (state: AppState): Partial<AppState> => {
    const phase = ChefPhase.Waiting;
    const chef = state.chef && {...state.chef, phase }
    return { chef };
  },
  say: (state: AppState, caption: Caption, sideEffects?: SideEffect): Partial<AppState> => {
    // do we need to do anything special if this happens during exiting animation?
    if(!caption) { 
      return sideEffects ? {...sideEffects(state),...actions.dismiss(state)} : actions.dismiss(state); 
    }
    if(caption.background) { route(caption.background) }
    const phase = !state.chef || state.chef.phase < ChefPhase.Onscreen ? ChefPhase.Entering : ChefPhase.Talking;
    const chef = { phase, caption }
    return sideEffects ? {...sideEffects(state), chef} : { chef };
  }
}
export interface ActionProps {
  dismiss: () => Partial<AppState>,
  talk: () => Partial<AppState>,
  stopTalking: () => Partial<AppState>,
  say: (caption: Caption, sideEffects?: SideEffect) => Partial<AppState>
}

interface OwnProps { }
type Props = Partial<AppState> & OwnProps & ActionProps;
interface State {}

interface BubbleProps { 
  caption: Caption,
  onPause: () => void;
  onResume: () => void;
  forward: ForwardingFunction;
}

const Bubble = ({caption, onPause, onResume, forward}: BubbleProps) => {
  return <div class={style.speechBubble}>
    <Content 
      caption={caption}
      onResume={onResume} 
      onPause={onPause} 
      forward={forward}
    />
  </div>

}
export const  ChefSays = connect(['chef'], actions )(({chef, dismiss, talk, stopTalking, say }: any) => {
  // no need to render anything if the chef is completely offscreen/dismissed
  if(chef.phase < ChefPhase.Transitioning) {return null}
  // otherwise... determine which animation class to apply

  const caption = chef.caption;
  const chefAnimation = chef.phase === ChefPhase.Talking ? style.talking :
            chef.phase === ChefPhase.Entering ? style.entering : 
            chef.phase === ChefPhase.Exiting ? style.exiting : 
            null;  
  const handleTransitions = (e: any) => {
    const animation = e.animationName;
    if(animation===style.enter) {talk()}
    if(animation===style.exit) {dismiss()}
    // don't need to handle transitions out of talking, that's handled by pause
    // callback
  }
  // TODO: This doesn't account for dialogues, just a temporary fix
  return (
    <div class={chef.phase > ChefPhase.Onscreen ? style.onscreen : style.transitioning } onClick={caption && !caption.undismissible ? dismiss : () => {}} >
      <div 
        class={`${style.chefBox} ${chefAnimation}`} 
        onAnimationEnd={e=>handleTransitions(e)}>
      <div class={`${style.chefSprite} ${chef && chef.phase === ChefPhase.Talking && style.talking}`}/>
        {chef.phase >= ChefPhase.Onscreen && <Bubble caption={chef.caption} onResume={talk} onPause={stopTalking} forward={(x?,y?)=>say(x,y)}/> }
      </div>
    </div>
      );
})

// export default connect<OwnProps, State, AppState, ActionProps>('chef')(ChefSays);
