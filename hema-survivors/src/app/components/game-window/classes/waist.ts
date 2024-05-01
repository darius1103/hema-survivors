import { BodyPart } from "./body-part";
import { Sprite } from "./sprite";
import { SpriteFrame } from "./sprite-frame";
import { XYLocation } from "./xylocation";

export class Waist extends BodyPart {
    public legsAnchorPoints: XYLocation[] = [];

    constructor() {
        super();
        this.defineSprite();
    }

    public defineSprite(): void {
        const data = [
            [0,0,0,2,4,4,4,4,4,4,4,4,4,4,4,2,0,0,0,0,0,0],
            [0,0,2,4,4,4,4,4,4,4,4,4,4,4,4,2,0,0,0,0,0,0],
            [0,0,2,4,4,4,4,4,4,4,4,4,4,4,4,2,0,0,0,0,0,0],
            [0,0,2,4,4,4,4,4,4,4,4,4,4,4,4,2,0,0,0,0,0,0],
            [0,2,4,4,4,4,4,2,4,4,2,4,4,4,4,4,2,0,0,0,0,0],
            [0,0,2,4,4,4,4,2,2,2,2,4,4,4,4,2,0,0,0,0,0,0],
        ];
        this.anchorPoints = [new XYLocation(0, 10)];
        this.legsAnchorPoints = [new XYLocation(6, -6), new XYLocation(6, 0)];
        const frame = new SpriteFrame(data);
        this.sprite =  new Sprite([frame]);
    }
}