import { SegmentConfig } from "./segment-config";
import { XY } from "./x-y";

export interface HeadConfig {
    helmet?: boolean, 
    cross?: boolean,
    helmet_config?: SegmentConfig, 
    cross_config?: SegmentConfig,
    spriteData: number[][],
    anchor: XY
}