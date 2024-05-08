import { SegmentConfig } from "./segment-config";
import { XY } from "./x-y";

export interface ArmConfig {
    sleave?: boolean, 
    guard?: boolean,
    albow?: boolean,
    glove?: boolean,
    weapon?: boolean,
    sleave_config?: SegmentConfig, 
    guard_config?: SegmentConfig,
    albow_config?: SegmentConfig,
    glove_config?: SegmentConfig,
    weapon_config?: SegmentConfig,
    spriteData: number[][],
    anchor: XY
}