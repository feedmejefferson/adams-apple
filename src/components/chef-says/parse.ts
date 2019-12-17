export interface CaptionFragment { 
  content: any, 
  start: number, 
  end: number, 
  last: string
}
export const EMPTY_FRAGMENT = {content: "", start: 0, end: 0, last: ""};
export const slice = (children: any, start?: number, end?: number): CaptionFragment => {
  const s=start || 0; // default to zero
  const e = (end==null) ? Number.MAX_SAFE_INTEGER : end; // default to max value
  if (typeof children === 'string') {
    let words = children.split(' ');
    if(start && words.length < start) {
      return { content: "", start: words.length, end: words.length, last: "" }
    }
    words = words.slice(s,e);
    return { content: words.join(' '), start: s, end: Math.min(e, s + words.length), last: words[words.length-1] || "" }
  }
  if(Array.isArray(children)) {
    let i=0;
    let offset=0;
    let last="";
    const value = [];
    while(i<children.length && offset<e) {
      const next = slice(children[i],Math.max(0,s-offset),e-offset)
      offset += next.end;
      if(next.start<next.end) {
        value.push(next.content)
      }
      last=next.last;
      i++;
    }
    return {content: value, start: Math.min(s,offset), end: offset, last}
  }
  if (typeof children === 'object') {
    const next = slice(children.children, start, end)
    return { ...next, content: {...children, children: next.content}}
  }
//  console.log(typeof children, children )
   return {content: children, start: 0, end: 0, last: "" }
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
//  console.log(typeof children, children )
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
//  console.log(typeof children, children )
  return {content: children, length: n }
}
