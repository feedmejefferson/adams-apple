
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

export interface Caption {
  text: any,
  undismissible?: boolean,
  next?: Caption, // | Array<{ display: string, caption: Caption }>
  background?: string
}

export interface CaptionMap {[key:string]: Caption}
