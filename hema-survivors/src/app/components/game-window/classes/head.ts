import { BodyPart } from "./body-part";
import { SpriteV1 } from "./sprite";
import { SpriteFrame } from "./sprite-frame";
import { XYLocation } from "./xylocation";

export class HeadV1 extends BodyPart {
    protected helmet: boolean = true;
    protected helmetAnchor: XYLocation = null as any;
    protected helmetOverlay: number[][] = null as any;

    constructor() {
        super();
        this.defineSprite();
    }

    public defineSprite(): void {
        this.data = [
            [0,0,0,0,0,2,4,4,2,0],
            [0,0,0,0,2,1,1,1,1,1],
            [0,0,0,2,4,4,4,4,2,2],
            [0,0,2,4,4,4,7,2,7,2],
            [0,0,2,4,4,4,7,7,7,2],
            [0,2,4,4,4,4,2,7,7,2],
            [0,2,4,4,4,4,2,2,2,2],
            [0,0,2,2,4,4,2,0,0,0],
        ];
        this.anchorPoints = [new XYLocation(7, 7)];
        this.helmetAnchor = new XYLocation(0, 0);

        this.data = [
            [0,0,0,0,2,2,2,2,2,2,2],
            [0,0,0,2,2,2,2,2,2,2,2],
            [0,0,0,2,2,2,2,12,3,12,2],
            [0,0,0,2,2,2,2,3,3,3,2],
            [0,0,0,2,2,2,2,12,3,12,2],
            [0,0,2,2,2,2,2,12,3,12,2],
            [0,0,2,2,2,2,2,12,3,12,2],
            [0,0,2,2,2,2,2,2,2,2,2],
            [0,0,0,2,2,2,2,2,0,0,0],
        ];

        this.data = this.addHelmet();

        const frame = new SpriteFrame(this.data);
        this.sprite =  new SpriteV1([frame]);
    }

    public addHelmet(): number[][] {
        if (!this.helmet || !this.helmetAnchor || !this.helmetOverlay) {
            return this.data;
        }
        return this.appendBodyPart({
            targetFrameData: this.data, 
            sourceFrameData: this.helmetOverlay, 
            anchorPoint: this.helmetAnchor,
            innerAnchorPoint: new XYLocation(0, 0),
            index: 0, 
            under: false}
        );
    }
}