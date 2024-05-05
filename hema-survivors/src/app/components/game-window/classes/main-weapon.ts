import { Box } from "../utils/box";
import { PIXEL_HEIGHT, SPRITE_SIZE } from "../utils/globals";
import { BodyPart } from "./body-part";
import { Sprite } from "./sprite";
import { SpriteFrame } from "./sprite-frame";
import { XYLocation } from "./xylocation";

export class Weapon extends BodyPart {
    private attackBox: Box[] = [];
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
        this.attackBox.push({topL: new XYLocation(SPRITE_SIZE / 4, SPRITE_SIZE / 2), bottomR:  new XYLocation(SPRITE_SIZE / 2, SPRITE_SIZE)});
        this.attackBox.push({topL: new XYLocation(2, SPRITE_SIZE / 2), bottomR:  new XYLocation(SPRITE_SIZE / 4, SPRITE_SIZE / 4 * 3)});
        const frame = new SpriteFrame(data);
        this.sprite =  new Sprite([frame]);
    }

    public getAttackBox(): Box[] {
        return this.attackBox;
    }
}