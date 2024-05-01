import { Arm } from "./arm";
import { Sprite } from "./sprite";
import { SpriteFrame } from "./sprite-frame";
import { XYLocation } from "./xylocation";

export class OffHand extends Arm {

    constructor() {
        super();
    }

    public override defineSprite(): void {
        const data = [
            [0,0,0,0,0,0,0,0,7,7,0,0],
            [0,0,0,0,0,0,0,0,7,7,7,0],
            [0,0,0,0,0,0,0,0,7,7,7,2],
            [0,0,0,0,0,0,0,7,7,7,7,2],
            [7,7,7,7,0,0,2,7,7,7,7,2],
            [7,7,7,7,7,7,7,7,7,7,0,0],
            [0,0,7,7,7,7,7,7,7,0,0,0],
            [0,0,0,7,7,7,7,2,0,0,0,0],
        ];
        this.anchorPoints = [new XYLocation(0, 0)];
        const frame = new SpriteFrame(data);
        this.sprite =  new Sprite([frame]);
    }
}