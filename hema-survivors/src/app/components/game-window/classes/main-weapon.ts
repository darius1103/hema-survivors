import { BodyPart } from "./body-part";
import { Sprite } from "./sprite";
import { SpriteFrame } from "./sprite-frame";
import { XYLocation } from "./xylocation";

export class Weapon extends BodyPart {

    constructor() {
        super();
        this.defineSprite();
    }

    public defineSprite(): void {
        const data = [
            [0,0,9,0,0],
            [0,0,9,0,0],
            [0,0,9,0,0],
            [0,0,9,0,0],
            [0,0,9,0,0],
            [0,0,9,0,0],
            [0,0,9,0,0],
            [0,0,9,0,0],
            [0,0,9,0,0],
            [0,0,9,0,0],
            [0,0,9,0,0],
            [9,9,9,9,9],
            [0,0,8,0,0],
            [0,0,8,0,0],
            [0,0,8,0,0],
            [0,0,8,0,0],
            [0,0,9,0,0],
        ];
        this.anchorPoints = [new XYLocation(15, 3)];
        const frame = new SpriteFrame([[]]);
        this.sprite =  new Sprite([frame]);
    }
}