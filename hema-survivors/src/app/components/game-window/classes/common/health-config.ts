import { BehaviorSubject } from "rxjs";
import { Box } from "./box";
import { HealthBarConfig } from "./health-bar-config";

export interface HealthConfig {
    maximumHealth: number,
    currentHealth: number,
    hitBoxes$: BehaviorSubject<Box[]>
    healthBar?: HealthBarConfig
}