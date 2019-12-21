import { Component, h } from "preact";
import { Link } from "preact-router";
import { justSayIt as say } from "../chef-says";
import { step1 } from "../intro";
import * as style from "./style.css";


interface Props {}
interface State {
  checked: boolean;
}

const FEEDBACK_PORTAL_LINK = process.env.FEEDBACK_PORTAL_LINK;

export class Menu extends Component<Props, State> {
  public render({ }: Props, { checked }: State) {
    return <nav role="navigation">
    <div class={style.menuToggle}>
      <input type="checkbox" checked={checked} onInput={this.updateCheck} />
      <span/>
      <span/>
      <span/>
      
      <ul class={style.menu}>
        <li><Link onClick={(e)=>{e.preventDefault();this.dismiss();}} href="/">Start Over</Link></li>
        <li><Link onClick={(e)=>{e.preventDefault();this.dismiss();say(step1)}} href="/intro/1">Tutorial</Link></li>
        <li><a onClick={(e)=>{this.dismiss()}} href={FEEDBACK_PORTAL_LINK} target="_blank" rel="noopener">Feedback</a></li>
      </ul>
    </div>
  </nav>
  
  }
  private updateCheck = (e: any) => {
    this.setState({ checked: e.target.checked });
  };
  private dismiss = () => {
    this.setState({checked: false});
  }
}