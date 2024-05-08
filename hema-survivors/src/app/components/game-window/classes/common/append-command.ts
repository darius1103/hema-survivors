import { Box } from "./box";
import { XY } from "./x-y";

export interface AppendCommand {
    targetFrameData: number[][], 
    sourceFrameData: number[][],
    anchorPoint: XY,
    innerAnchorPoint: XY, 
    under: boolean,
    sourceHitBox: Box
}