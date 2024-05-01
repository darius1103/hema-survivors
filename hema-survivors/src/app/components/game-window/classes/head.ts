import { BodyPart } from "./body-part";
import { Sprite } from "./sprite";
import { SpriteFrame } from "./sprite-frame";
import { XYLocation } from "./xylocation";

export class Head extends BodyPart {

    constructor() {
        super();
        this.defineSprite();
    }

    public defineSprite(): void {
        const data = [
            [0,0,0,0,0,2,4,4,2,0],
            [0,0,0,0,2,1,1,1,1,1],
            [0,0,0,2,4,4,4,4,2,2],
            [0,0,2,4,4,4,7,2,7,2],
            [0,2,4,4,4,4,7,7,7,2],
            [0,2,4,4,4,4,2,7,7,2],
        ];
        this.anchorPoints = [new XYLocation(5, 7)];
        const frame = new SpriteFrame(data);
        this.sprite =  new Sprite([frame]);
    }
}