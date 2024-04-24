import { Color } from "../utils/color";
import { XYLocation } from "./xylocation";

export class Player {
    absolutePosition: XYLocation = new XYLocation(0, 0);

    public draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        ctx.beginPath();
        ctx.rect( x - 5, y - 5, 10, 10);
        ctx.fillStyle = Color.DUCK;
        ctx.fill();
    }
}