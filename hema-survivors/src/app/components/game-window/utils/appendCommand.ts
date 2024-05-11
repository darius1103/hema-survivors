import { XY } from "../classes/xylocation";

export interface AppendCommandV1 {
    targetFrameData: number[][], 
    sourceFrameData: number[][],
    anchorPoint: XY,
    innerAnchorPoint: XY, 
    index: number,
    under: boolean,
}