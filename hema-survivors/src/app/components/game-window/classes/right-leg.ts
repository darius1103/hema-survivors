import { Leg } from "./leg";
import { SpriteV1 } from "./sprite";
import { SpriteFrame } from "./sprite-frame";
import { XYLocation } from "./xylocation";

export class RightLeg extends Leg {

    constructor() {
        super();
    }

    public override defineSprite(): void {
        const data = [
            [0,2,5,5,5,5,5,2],
            [0,2,5,5,5,5,2,2],
            [0,2,5,5,5,2,0,0],
            [0,2,5,5,5,2,0,0],
            [0,2,5,5,5,2,0,0],
            [2,5,5,5,5,5,2,0],
            [2,5,5,5,5,5,2,0],
            [2,5,5,5,5,5,2,0],
            [0,2,5,5,5,2,0,0],
            [0,2,5,5,5,2,0,0],
            [0,2,5,5,5,2,0,0],
            [0,2,8,8,8,2,0,0],
            [0,2,8,8,8,8,2,0],
            [0,8,8,8,8,8,8,8],
        ];
        this.anchorPoints = [new XYLocation(0, 3)];
        const frame = new SpriteFrame(data);
        this.sprite =  new SpriteV1([frame]);
    }
}