import { SegmentConfig } from "./segment-config";
import { XY } from "./x-y";

export interface WaistConfig {
    dagger?: boolean,
    dagger_config?: SegmentConfig,
    spriteData: number[][],
    anchor: XY
}