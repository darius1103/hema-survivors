import { Arm } from "./arm";
import { Sprite } from "./sprite";
import { SpriteFrame } from "./sprite-frame";
import { XYLocation } from "./xylocation";

export class MainHand extends Arm {

    constructor() {
        super();
    }

    public override defineSprite(): void {
        const data = [
            [0,0,2,7,7,0,0,0,0,0,0,0,0],
            [0,0,2,7,7,7,0,0,0,0,0,0,0],
            [0,2,7,7,7,7,0,0,0,0,7,7,7],
            [0,2,7,7,7,0,0,0,0,7,7,7,7],
            [0,2,7,7,7,7,0,0,7,7,7,0,0],
            [0,2,2,7,7,7,7,7,7,7,7,0,0],
            [0,0,2,7,7,7,7,7,7,7,7,0,0],
            [0,0,0,0,7,7,7,7,7,0,0,0,0],
            [0,0,0,0,2,7,7,7,0,0,0,0,0],
        ];
        this.anchorPoints = [new XYLocation(0, 4)];
        this.weaponAnchorPoints = [new XYLocation(3, 12)];
        const frame = new SpriteFrame(data);
        this.sprite =  new Sprite([frame]);
    }
}