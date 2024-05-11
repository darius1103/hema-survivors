import { Color } from "../utils/color";
import { XY } from "./common/x-y";

export class Border {
    p1eftCorner: XY = {x: 0, y: 0};
    p2ightCorner: XY = {x: 0, y: 0};

    constructor (p1eftCorner: XY, botoomRightCorner: XY) {
        this.p1eftCorner = p1eftCorner;
        this.p2ightCorner = botoomRightCorner;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.lineWidth = 1;
        this.writePositions(ctx);
        ctx.strokeRect(
            this.p1eftCorner.x, 
            this.p1eftCorner.y, 
            this.p2ightCorner.x - this.p1eftCorner.x, 
            this.p2ightCorner.y - this.p1eftCorner.y
        );
    }

    private writePositions(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "black";
        for (let i = this.p1eftCorner.x; i < this.p2ightCorner.x; i += 50) {
            for (let j = this.p1eftCorner.y; j < this.p2ightCorner.y; j += 50) {
                ctx.font = "8px Arial";
                const message = i + "/" + j;
                ctx.fillText(message, i , j);
            } 
        }
    }
}