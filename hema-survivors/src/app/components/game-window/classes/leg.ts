import { BodyPart } from "./body-part";
import { Sprite } from "./sprite";
import { SpriteFrame } from "./sprite-frame";
import { XYLocation } from "./xylocation";

export class Leg extends BodyPart {
    protected shorts: boolean = false;
    protected greeve: boolean = false;

    constructor() {
        super();
        this.defineSprite();
    }

    public defineSprite(): void {
        this.anchorPoints = [new XYLocation(0, 6)];
        const frame = new SpriteFrame([[]]);
        this.sprite =  new Sprite([frame]);
    }
}