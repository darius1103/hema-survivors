import { BehaviorSubject } from "rxjs";
import { Box } from "./box";

export interface HealthConfig {
    maximumHealth: number,
    currentHealth: number,
    hitBoxes$: BehaviorSubject<Box[]>
}