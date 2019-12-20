import { AppState } from "src/state/types";

export enum ChefPhase {
  Offscreen = 0,
  Transitioning = 1,
  Exiting = 2,
  Entering = 3,
  Onscreen = 4,
  Talking = 5,
  Waiting = 6
}

export interface Chef {
  phase: ChefPhase,
  caption?: Readonly<Caption>
}

export type SideEffect = (state: AppState) => Partial<AppState>; 
export type ForwardingFunction = (caption?: Caption, sideEffects?: SideEffect) => void;
export interface OptionList { 
  display: string, 
  caption: Caption, 
  sideEffects?: SideEffect 
}

export interface Caption {
  text: any,
  undismissible?: boolean,
  next?: Caption | OptionList[]
  background?: string
}

export interface CaptionMap {[key:string]: Caption}
