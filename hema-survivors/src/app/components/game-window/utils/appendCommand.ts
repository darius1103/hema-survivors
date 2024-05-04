import { XYLocation } from "../classes/xylocation";

export interface AppendCommand {
    targetFrameData: number[][], 
    sourceFrameData: number[][],
    anchorPoint: XYLocation,
    innerAnchorPoint: XYLocation, 
    index: number,
    under: boolean,
}