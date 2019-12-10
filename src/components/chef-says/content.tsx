import { Component, h } from "preact";
import { route } from "preact-router";
import { connect } from "unistore/preact";
import { AppState, Chef, ChefPhase } from "../../state/types";
import * as style from "./style.css";


interface Props { 
  children: any
}
interface State {
  original: any,
  count: number
}

const firstNWords = (children: any, n: number): {content: any, length: number} => {
  if(Array.isArray(children)) {
    let i=0;
    let l=0;
    const value = [];
    while(i<children.length && l<n){
      const content = firstNWords(children[i],n-l)
      value.push(content.content)
      l+=content.length;
      i++;
    }
    return {content: value, length: l}
  }
  if (typeof children === 'string') {
    const s = children.split(' ');
    return s.length < n ? { content: children, length: s.length } : { content: s.slice(0,n).join(' '), length: n }
  }
  if (typeof children === 'object') {
    const c = firstNWords(children.children, n)
    return { content: {...children, children: c.content}, length: c.length}
  }
  console.log(typeof children, children )
  return {content: children, length: n }
}

const firstN = (children: any, n: number): {content: any, length: number} => {
  if(Array.isArray(children)) {
    let i=0;
    let l=0;
    const value = [];
    while(i<children.length && l<n){
      const content = firstN(children[i],n-l)
      value.push(content.content)
      l+=content.length;
      i++;
    }
    return {content: value, length: l}
  }
  if (typeof children === 'string') {
    return children.length < n ? { content: children, length: children.length } : { content: children.substr(0,n), length: n }
  }
  if (typeof children === 'object') {
    const c = firstN(children.children, n)
    return { content: {...children, children: c.content}, length: c.length}
  }
  console.log(typeof children, children )
  return {content: children, length: n }
}


export class Content extends Component<Props> {
  public content: any;
  public render({ children }: Props, {count, original}: State) {
    const { content, length } = firstN(children, count)
      if(!count || count < length+1) { 
        setTimeout(()=>this.setState({count:length+1}),25)
      }
      console.log(count)
      return (
        <div ref={c=> this.content=c}>{content}</div>
      );
  }
  public componentDidUpdate(){
//    console.log(this.content.offsetHeight)
  }
}
