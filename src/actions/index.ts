import * as constants from "../constants"
import { Choice } from "../types"

export interface MakeChoice<T> {
    type: constants.MAKE_CHOICE,
    choice: Choice<T>
}

export function makeChoice<T>(choice: Choice<T>): MakeChoice<T> {
    return {type: constants.MAKE_CHOICE,
    choice
    }
}


// Not a real action, I'm just trying this out
export interface Reverse {
    type: constants.REVERSE
}

export function reverse(): Reverse {
    return {type: constants.REVERSE}
}