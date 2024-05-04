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
            [0,0,0,5,5,5,5,2,2,2,2,5,5,5,5,0,0,0],
        ];
        this.legsAnchorPoints = [new XYLocation(5, 4), new XYLocation(5, 10)];
        this.legs.forEach((leg: Leg, index: number) => {
            data = this.appendBodyPart(
            {   targetFrameData: data, 
                sourceFrameData: leg.getSprite().frames[0].data as any, 
                anchorPoint: this.legsAnchorPoints[index],
                innerAnchorPoint: leg.getAnchorPoints()[0],
                index: 0, 
                under: true});
            });
        this.anchorPoints = [new XYLocation(1, data[0].length / 2 )];
        const frame = new SpriteFrame(data);
        this.sprite =  new Sprite([frame]);
    }
}