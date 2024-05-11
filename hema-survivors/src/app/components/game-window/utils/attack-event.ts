import { Box } from "../classes/common/box";
import { XY } from "../classes/common/x-y";

export interface AttackEvent {
    id: string,
    location: XY,
    boxes: Box[],
    damage: number
}