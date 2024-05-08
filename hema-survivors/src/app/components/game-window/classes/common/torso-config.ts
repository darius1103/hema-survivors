import { SegmentConfig } from "./segment-config";
import { XY } from "./x-y";

export interface TorsoConfig {
    cross?: boolean,
    cross_config?: SegmentConfig,
    spriteData: number[][],
    anchor: XY
}