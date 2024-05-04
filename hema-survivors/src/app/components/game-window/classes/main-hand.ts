import { Arm } from "./arm";
import { Weapon } from "./main-weapon";
import { Sprite } from "./sprite";
import { SpriteFrame } from "./sprite-frame";
import { XYLocation } from "./xylocation";

export class MainHand extends Arm {

    constructor(weapon: Weapon | null = null) {
        super(weapon);
    }

    public override defineSprite(): void {
        let data = [
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
        this.weaponAnchorPoints = [new XYLocation(5, 11)];
        data = this.appendBodyPart(
            {   frameData: data, 
                bodyPart: this.weapon as any, 
                anchorPoint: this.weaponAnchorPoints[0], 
                index: 0, 
                under: true});

        const frame = new SpriteFrame(data);
        this.sprite =  new Sprite([frame]);
    }
}