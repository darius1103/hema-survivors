import { SPRITE_SIZE } from "../utils/globals";
import { BodyPart } from "./body-part";
import { LeftLeg } from "./left-leg";
import { Leg } from "./leg";
import { RightLeg } from "./right-leg";
import { Sprite } from "./sprite";
import { SpriteFrame } from "./sprite-frame";
import { XYLocation } from "./xylocation";

export class Waist extends BodyPart {
    public legsAnchorPoints: XYLocation[] = [];
    public legs: Leg[]= [new RightLeg(), new LeftLeg()];

    constructor() {
        super();
        this.defineSprite();
    }

    public defineSprite(): void {
        let data = [
            [0,0,0,2,5,5,5,5,5,5,5,5,5,5,5,2,0,0],
            [0,0,2,5,5,5,5,5,5,5,5,5,5,5,5,2,0,0],
            [0,0,2,5,5,5,5,5,5,5,5,5,5,5,5,2,0,0],
            [0,0,2,5,5,5,5,5,5,5,5,5,5,5,5,2,0,0],
            [0,2,5,5,5,5,5,2,5,5,2,5,5,5,5,5,2,0],
            [0,0,2,5,5,5,5,2,2,2,2,5,5,5,5,2,0,0],
        ];
        this.legsAnchorPoints = [new XYLocation(5, 4), new XYLocation(5, 10)];
        data = this.appendBodyPart(
            {   frameData: data, 
                bodyPart: this.legs[0] as any, 
                anchorPoint: this.legsAnchorPoints[0], 
                index: 0, 
                under: true});
        data = this.appendBodyPart(
            {   frameData: data, 
                bodyPart: this.legs[1] as any, 
                anchorPoint: this.legsAnchorPoints[1], 
                index: 0, 
                under: true});
        this.anchorPoints = [new XYLocation(1, 9)];
        const frame = new SpriteFrame(data);
        this.sprite =  new Sprite([frame]);
    }
}