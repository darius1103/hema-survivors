import { BodyPart } from "../classes/body-part";
import { XYLocation } from "../classes/xylocation";

export interface AppendCommand {
    frameData: number[][], 
    bodyPart: BodyPart, 
    anchorPoint: XYLocation,
    index: number,
    under: boolean,
}