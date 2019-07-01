// Generic concepts
export interface Dilemma<T> {
    a: T,
    b: T
}
export interface Choice<T> {
    chosen: T,
    notChosen: T
}
export interface Mood<T> {
    dilemma: Dilemma<T>,
    choices: Array<Choice<T>> 
}
// food specific implementations
export interface Food {
    id: string
}
export function food(id: string): Food {
    return {id}
}
export function dilemma(aId: string, bId: string): Dilemma<Food> {
    return {a:food(aId), b:food(bId)}
}
export class Appetite implements Mood<Food> {
    public dilemma: Dilemma<Food>;    
    public choices: Array<Choice<Food>>=[];
    constructor() {
        this.dilemma={a:food('1'),b:food('2')}
    }

} 