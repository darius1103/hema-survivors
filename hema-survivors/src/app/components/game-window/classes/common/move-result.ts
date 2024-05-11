import { XY } from "./x-y";

export interface MoveResult {
    newPosition: XY,
    oldPosition: XY,
    facingRight: boolean,
}