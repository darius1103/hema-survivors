import { XY } from "../common/x-y";

export class MovementController {
    public move(p1: XY, p2: XY): XY {
        return {x: 0, y: 0};
    }

    public ltr(): boolean {
        return true;
    }
}