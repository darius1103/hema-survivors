import { Fighter } from "../classes/fighter";
import { XYLocation } from "../classes/xylocation";

export interface DeathEvent {
    id: string,
    unit: Fighter,
}