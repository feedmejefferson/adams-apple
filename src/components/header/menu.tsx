import { Component, h } from "preact";
import { justSayIt as say } from "../chef-says";
import { step1 } from "../intro";
import * as style from "./style.css";


interface Props {}
interface State {
  checked: boolean;
}

export class Menu extends Component<Props, State> {
  public render({ }: Props, { checked }: State) {
    return <nav role="navigation">
    <div class={style.menuToggle}>
      <input type="checkbox" checked={checked} onInput={this.updateCheck} />
      <span/>
      <span/>
      <span/>
      
      <ul class={style.menu}>
        <a href="/"><li>Start Over</li></a>
        <a href="/intro/1" onClick={(e)=>{this.setState({checked: false});say(step1)}}><li>Tutorial</li></a>
        <a onClick={()=>this.setState({checked: false})} href="https://portal.prodpad.com/7a1ea292-9d81-11e9-ba11-0288f735e5b9" target="_blank" rel="noopener"><li>Feedback</li></a>
      </ul>
    </div>
  </nav>
  
  }
  private updateCheck = (e: any) => {
    this.setState({ checked: e.target.checked });
  };
}