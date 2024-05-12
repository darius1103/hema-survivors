import { HealthBarConfig } from "./health-bar-config";
import { XY } from "./x-y";

export interface HealthBarDrawCommand {
    ctx: CanvasRenderingContext2D,
    config: HealthBarConfig,
    percentage: number, 
    location: XY
}