import { Sprite } from "./sprite";
import { XYLocation } from "./xylocation";

export class BodyPart {
    protected sprite: Sprite = new Sprite([]);
    protected anchorPoints: XYLocation[] = [];

    public getSprite(): Sprite {
        return this.sprite;
    }

    public getAnchorPoints(): XYLocation[] {
        return this.anchorPoints;
    }
}