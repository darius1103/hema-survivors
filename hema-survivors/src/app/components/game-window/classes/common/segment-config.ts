import { Sprite } from "../display/sprite";
import { XY } from "./x-y";

export interface SegmentConfig {
    sprite: Sprite,
    under: boolean,
    anchorPoint: XY,
    name?: String
}