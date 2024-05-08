import { SegmentConfig } from "./segment-config";
import { XY } from "./x-y";

export interface LegConfig {
    sleave?: boolean, 
    guard?: boolean,
    knee?: boolean,
    shoe?: boolean,
    sleave_config?: SegmentConfig, 
    guard_config?: SegmentConfig,
    knee_config?: SegmentConfig,
    shoe_config?: SegmentConfig,
    spriteData: number[][],
    anchor: XY
}