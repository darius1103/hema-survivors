import { XYLocation } from "../classes/xylocation";

export interface AppendCommandV1 {
    targetFrameData: number[][], 
    sourceFrameData: number[][],
    anchorPoint: XYLocation,
    innerAnchorPoint: XYLocation, 
    index: number,
    under: boolean,
}