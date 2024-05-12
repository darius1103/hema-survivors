import { XY } from "./x-y";

export interface DrawCommand {
    targetCtx: CanvasRenderingContext2D, 
    sourceCtx: HTMLCanvasElement,
    position: XY
}