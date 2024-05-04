import { FighterSettings } from "../utils/fitherSettings";
import { BodyPart } from "./body-part";
import { Sprite } from "./sprite";
import { SpriteFrame } from "./sprite-frame";
import { XYLocation } from "./xylocation";

export class Torso extends BodyPart {
    public headAnchorPoint: XYLocation = new XYLocation(0, 0);
    public armAnchorPoints: XYLocation[] = [];
    public waistAnchorPoint: XYLocation = new XYLocation(0, 0);

    protected crossDecal: boolean = true;
    protected crossDecalAnchor: XYLocation = null as any;
    protected crossDecalOverlay: number[][] = null as any;

    constructor(settings: FighterSettings) {
        super(settings);
        this.defineSprite();
    }

    public defineSprite(): void {
        this.data = [
            [0,0,0,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0],
            [0,0,4,1,1,1,1,1,1,1,1,1,4,0,0,0,0,0,0],
            [0,0,4,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,0],
            [0,0,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4],
            [0,0,0,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4],
            [0,0,0,4,1,1,1,1,1,1,1,1,1,1,1,1,1,4,0],
            [0,0,0,4,1,1,1,1,1,1,1,1,1,1,1,1,4,0,0],
            [0,0,0,4,1,1,1,1,1,1,1,1,1,1,1,1,4,0,0],
            [0,0,0,4,1,1,1,1,1,1,1,1,1,1,1,1,4,0,0],
            [0,0,0,4,1,1,1,1,1,1,1,1,1,1,1,1,4,0,0],
            [0,0,0,4,1,1,1,1,1,1,1,1,1,1,1,1,4,0,0],
            [0,0,0,0,4,1,1,1,1,1,1,1,1,1,1,4,0,0,0],
            [0,0,0,0,4,1,1,1,1,1,1,1,1,1,1,4,0,0,0],
            [0,0,0,0,4,1,1,1,1,1,4,1,1,1,4,0,0,0,0],
            [0,0,0,0,4,1,1,1,1,1,4,1,1,1,4,0,0,0,0],
            [0,0,0,4,1,1,1,1,1,1,1,1,1,1,1,4,0,0,0],
            [0,0,0,4,1,1,1,1,1,1,1,1,1,1,1,1,4,0,0],
            [0,0,4,1,1,1,1,1,1,1,4,1,1,1,1,1,4,0,0],
            [0,0,0,4,1,1,1,1,1,1,4,1,1,1,1,4,0,0,0],
            [0,0,0,0,4,1,1,1,1,4,4,1,1,4,4,0,0,0,0],
            [0,0,0,0,0,4,4,4,4,0,0,4,4,0,0,0,0,0,0],
        ];
        this.anchorPoints = [new XYLocation(10, 10)];
        this.headAnchorPoint = new XYLocation(1, 11);
        this.armAnchorPoints = [new XYLocation(3, 3), new XYLocation(4, 18)];
        this.waistAnchorPoint = new XYLocation(19, 9);

        this.crossDecalAnchor = new XYLocation(0, 0);
        this.crossDecalOverlay = [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,2,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0],
            [0,0,0,2,2,0,0,0,0,2,2,2,0,0,0,0,0,0,0],
            [0,0,0,2,2,2,0,0,0,2,2,2,0,0,0,0,2,2,0],
            [0,0,0,0,2,2,2,2,0,0,2,2,2,0,0,2,2,2,0],
            [0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0,0],
            [0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,0,0,0],
            [0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0],
        ];

        this.data = this.crossDecal ? 
            this.addOverlay(this.crossDecalAnchor, 
            this.crossDecalOverlay) : this.data;
        this.data = this.adjustDataForTheme();
        const frame = new SpriteFrame(this.data);
        this.sprite =  new Sprite([frame]);
    }
}