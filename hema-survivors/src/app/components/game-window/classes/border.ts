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
        ctx.strokeRect(
            this.topLeftCorner.x, 
            this.topLeftCorner.y, 
            this.bottomRightCorner.x - this.topLeftCorner.x, 
            this.bottomRightCorner.y - this.topLeftCorner.y
        );
    }
}