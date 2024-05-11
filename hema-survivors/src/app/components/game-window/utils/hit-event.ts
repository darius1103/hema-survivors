import { XY } from "../classes/common/x-y";
import { Fighter } from "../classes/fighter";

export interface HitEvent {
    text: string,
    unit: Fighter,
    location: XY
}