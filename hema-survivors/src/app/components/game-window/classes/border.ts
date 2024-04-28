import { Color } from "../utils/color";
import { XYLocation } from "./xylocation";

export class Border {
    topLeftCorner: XYLocation = new XYLocation(0, 0);
    bottomRightCorner: XYLocation = new XYLocation(0, 0);

    constructor (topLeftCorner: XYLocation, botoomRightCorner: XYLocation) {
        this.topLeftCorner = topLeftCorner;
        this.bottomRightCorner = botoomRightCorner;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.lineWidth = 15;
        this.writePositions(ctx);
        ctx.strokeRect(
            this.topLeftCorner.x, 
            this.topLeftCorner.y, 
            this.bottomRightCorner.x - this.topLeftCorner.x, 
            this.bottomRightCorner.y - this.topLeftCorner.y
        );
    }

    private writePositions(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "black";
        for (let i = this.topLeftCorner.x; i < this.bottomRightCorner.x; i += 50) {
            for (let j = this.topLeftCorner.y; j < this.bottomRightCorner.y; j += 50) {
                ctx.font = "8px Arial";
                const message = i + "/" + j;
                ctx.fillText(message, i , j);
            } 
        }
    }
}