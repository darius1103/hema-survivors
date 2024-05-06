import { Fighter } from "../classes/fighter";
import { XYLocation } from "../classes/xylocation";

export interface HitEvent {
    text: string,
    unit: Fighter,
    location: XYLocation
}