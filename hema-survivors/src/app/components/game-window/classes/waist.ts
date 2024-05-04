import { FighterSettings } from "../utils/fitherSettings";
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

    constructor(settings: FighterSettings) {
        super(settings);
        this.defineSprite();
    }

    public defineSprite(): void {
        this.data = [
            [0,0,0,4,1,1,1,1,1,1,1,1,1,1,1,4,0,0],
            [0,0,4,1,1,1,1,1,1,1,1,1,1,1,1,4,0,0],
            [0,0,4,1,1,1,1,1,1,1,1,1,1,1,1,4,0,0],
            [0,0,4,1,1,1,1,1,1,1,1,1,1,1,1,4,0,0],
            [0,4,1,1,1,1,1,4,1,1,4,1,1,1,1,1,4,0],
            [0,0,0,1,1,1,1,4,4,4,4,1,1,1,1,0,0,0],
        ];
        this.data = this.adjustDataForTheme();
        this.legsAnchorPoints = [new XYLocation(5, 4), new XYLocation(5, 10)];
        this.legs.forEach((leg: Leg, index: number) => {
            this.data = this.appendBodyPart(
            {   targetFrameData: this.data, 
                sourceFrameData: leg.getSprite().frames[0].data as any, 
                anchorPoint: this.legsAnchorPoints[index],
                innerAnchorPoint: leg.getAnchorPoints()[0],
                index: 0, 
                under: true});
            });
        this.anchorPoints = [new XYLocation(1, this.data[0].length / 2 )];
        const frame = new SpriteFrame(this.data);
        this.sprite =  new Sprite([frame]);
    }
}