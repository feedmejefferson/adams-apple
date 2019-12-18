import { Component, h } from "preact";
import { route } from "preact-router";
import { connect } from "unistore/preact";
import { AppState } from "../../state/types";
import { Content } from "./content";
import * as style from "./style.css";
import { Caption, Chef, ChefPhase } from "./types";

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
  say: (state: AppState, caption: Caption): Partial<AppState> => {
    // do we need to do anything special if this happens during exiting animation?
    if(!caption) { return actions.dismiss(state) }
    if(caption.background) { route(caption.background) }
    const phase = !state.chef || state.chef.phase < ChefPhase.Onscreen ? ChefPhase.Entering : ChefPhase.Talking;
    const chef = { phase, caption }
    return { chef };
  }
}
export interface ActionProps {
  dismiss: () => Partial<AppState>,
  talk: () => Partial<AppState>,
  stopTalking: () => Partial<AppState>,
  say: (caption: Caption) => Partial<AppState>
}

interface OwnProps { }
type Props = Partial<AppState> & OwnProps & ActionProps;
interface State {}

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
      <div class={style.coverScreen} />
      <div 
        class={`${style.chefBox} ${chefAnimation}`} 
        onAnimationEnd={e=>handleTransitions(e)}>
      <div 
        class={`${style.chefSprite} ${chef && chef.phase === ChefPhase.Talking && style.talking}`}/>
        <div class={style.speechBubble}>
            {chef.phase >= ChefPhase.Onscreen && <Content onResume={talk} onPause={stopTalking} onComplete={()=>say(caption.next)}>{chef.caption.text}</Content>}
        </div>
      </div>
    </div>
      );
})

// export default connect<OwnProps, State, AppState, ActionProps>('chef')(ChefSays);
export const SaySomething = connect('', actions )(({ message, say }: any) => {
  const caption: Caption = { text: message || <p>I really <strong>love</strong> broccoli. seriously, what if there was a hell of a lot more text here to have to fit in this stupid little box.</p>}
  setTimeout(()=>{say(caption)},1000)
  return null;
})