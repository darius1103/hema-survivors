import { XY } from "../common/x-y";

export class EnemyController {
    public draw(targetCtx: CanvasRenderingContext2D, sourceCtxRTL: HTMLCanvasElement, sourceCtxLTR: HTMLCanvasElement) {
        
    }

    public getId(): string {
        return "default";
    }

    public move(p1: XY, p2: XY): XY {
        return {x: 0, y: 0};
    }

    public getAbsolutePositon(): XY {
        return {x: 0, y: 0};
    }

    public getOldPositon(): XY {
        return {x: 0, y: 0};
    }
}