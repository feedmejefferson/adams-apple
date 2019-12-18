import { Component, h } from "preact";
import { CaptionFragment, EMPTY_FRAGMENT, slice } from "./parse"
import * as style from "./style.css";

enum Phase {
  Talking = 0,
  More = 1,
  Complete = 2
}

interface Props { 
  children: any,
  onPause: () => void;
  onResume: () => void;
  onComplete: () => void;
}
interface State {
  fragment: CaptionFragment,
  phase: Phase
}

export class Content extends Component<Props, State> {
  public content: any;
  public delay = 40; // extra millisecond delay per word character
  public componentWillReceiveProps(nextProps: Props){
    if(nextProps.children!==this.props.children && JSON.stringify(nextProps.children)!==JSON.stringify(this.props.children)){
      this.setState({fragment: EMPTY_FRAGMENT, phase: Phase.Talking});
    }
  }
  public shouldComponentUpdate(props: Props, {phase, fragment}: State) {
    if(!fragment || !this.state.fragment ) { return true }
    return (phase !== this.state.phase || fragment.end > this.state.fragment.end);
  }

  public render({ children }: Props, {fragment, phase}: State) {
    if(!fragment) {
      this.setState({fragment: EMPTY_FRAGMENT})
      return <div class={style.caption} ref={c=> this.content=c}/>
    }
    const handleClick = (e: any) => {
      if(e) { e.stopPropagation() } 
      if(phase===Phase.More) { 
        this.props.onResume();
        this.setState({fragment: slice(children, fragment.end, fragment.end), phase: Phase.Talking});
      } else if (phase===Phase.Complete) { 
        this.props.onComplete();
      } else { 
        // chef is still talking, user is impatient -- speed things up
        this.delay = 1 
      }
    }
    return (
      <div class={style.caption} ref={c=> this.content=c} onClick={handleClick}>
        <p>
        {fragment.content}
        {phase===Phase.More && " ..."}
        </p>
      </div>
    );
  }
  public componentDidUpdate(prevProps: Props, prevState: State){
    if(!this.content.firstChild) { return }
    const containerHeight = this.content.offsetHeight;
    const textHeight = this.content.firstChild.offsetHeight
    const lineHeight = parseInt(getComputedStyle(this.content.firstChild).getPropertyValue('line-height')) || 0;
    if(containerHeight - textHeight > lineHeight) { 
      const fragment = this.state.fragment;
      const nextFragment = slice(this.props.children, fragment.start, fragment.end+1)
        if(nextFragment.end===fragment.end) {
          this.setState({phase: Phase.Complete});
          this.props.onPause();
//        setTimeout(()=>{this.props.onPause()},500);
        return;
  
      }      
      setTimeout(()=>{this.setState({fragment: nextFragment})},this.delay*fragment.last.length) 
      return;
    }
    this.setState({phase: Phase.More});
    this.props.onPause();
//    setTimeout(()=>{this.props.onPause()},500);
  }
  
}
