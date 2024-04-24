import { Color } from "../utils/color";
import { XYLocation } from "./xylocation";

export class Border {
    absolutePosition: XYLocation = new XYLocation(0, 0);

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.strokeRect(120, 120, 240, 240);
    }
}