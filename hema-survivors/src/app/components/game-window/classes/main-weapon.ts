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
            [0,0,9,9,0,0],
            [0,0,9,9,0,0],
            [0,0,9,9,0,0],
            [0,0,9,9,0,0],
            [0,0,9,9,0,0],
            [0,0,9,9,0,0],
            [0,0,9,9,0,0],
            [0,0,9,9,0,0],
            [0,0,9,9,0,0],
            [0,0,9,9,0,0],
            [0,0,9,9,0,0],
            [0,0,9,9,0,0],
            [0,0,9,9,0,0],
            [0,0,9,9,0,0],
            [0,0,9,9,0,0],
            [0,0,9,9,0,0],
            [0,0,9,9,0,0],
            [0,0,9,9,0,0],
            [0,0,9,9,0,0],
            [0,0,9,9,0,0],
            [0,0,9,9,0,0],
            [0,0,9,9,0,0],
            [0,0,9,9,0,0],
            [0,0,9,9,0,0],
            [9,9,9,9,9,9],
            [0,0,8,8,0,0],
            [0,0,8,8,0,0],
            [0,0,8,8,0,0],
            [0,0,8,8,0,0],
            [0,0,8,8,0,0],
            [0,0,8,8,0,0],
            [0,0,8,8,0,0],
            [0,0,9,9,0,0],
            [0,0,9,9,0,0],
        ];
        this.anchorPoints = [new XYLocation(data.length - 5, 3)];
        const frame = new SpriteFrame(data);
        this.sprite =  new Sprite([frame]);
    }
}