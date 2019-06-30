export interface Food {
    id: string
}

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

export type Appetite = Mood<Food> 