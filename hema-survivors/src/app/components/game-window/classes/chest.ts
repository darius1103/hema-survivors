import { BodyPart } from "./body-part";
import { Sprite } from "./sprite";
import { SpriteFrame } from "./sprite-frame";
import { XYLocation } from "./xylocation";

export class Chest extends BodyPart {
    public headAnchorPoint: XYLocation = new XYLocation(0, 0);
    public armAnchorPoints: XYLocation[] = [];
    public waistAnchorPoint: XYLocation = new XYLocation(0, 0);

    constructor() {
        super();
        this.defineSprite();
    }

    public defineSprite(): void {
        // const data = [
        //     [4,4,4,4,4,4,4],
        //     [5,5,5,5,5,5,5],
        //     [6,6,6,6,6,6,6],
        //     [7,7,7,7,7,7,7],
        //     [6,6,6,6,6,6,6],
        //     [6,6,6,6,6,6,6],
        // ];
        const data = [
            [0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0],
            [0,0,2,4,4,5,5,5,5,4,4,5,2,0,0,0,0,0,0],
            [0,0,2,4,5,4,5,5,5,5,5,5,5,5,2,2,2,2,0],
            [0,0,2,4,5,5,4,5,5,5,5,5,5,5,5,4,5,4,2],
            [0,0,0,2,5,5,5,5,5,5,5,5,5,5,4,5,5,4,2],
            [0,0,0,2,5,5,5,5,5,5,5,5,5,5,5,5,4,2,0],
            [0,0,0,2,5,5,5,5,5,5,5,5,5,5,5,5,2,0,0],
            [0,0,0,2,5,5,5,5,5,5,5,5,5,5,5,5,2,0,0],
            [0,0,0,0,2,5,5,5,5,5,5,5,5,5,5,5,5,0,0],
            [0,0,0,0,2,5,5,5,5,5,5,5,5,5,5,5,2,0,0],
            [0,0,0,0,2,5,5,5,5,5,2,5,5,5,5,5,0,0,0],
            [0,0,0,0,2,5,5,5,5,5,2,5,5,5,2,0,0,0,0],
            [0,0,0,2,5,5,5,5,5,5,5,5,5,5,5,2,0,0,0],
            [0,0,0,2,5,5,5,5,5,5,5,5,5,5,5,5,2,0,0],
            [0,0,2,5,5,5,5,5,5,5,2,5,5,5,5,5,2,0,0],
            [0,0,0,2,5,5,5,5,5,5,2,5,5,5,5,2,0,0,0],
            [0,0,0,0,2,5,5,5,5,2,2,5,5,2,2,0,0,0,0],
            [0,0,0,0,0,2,2,2,2,0,0,2,2,0,0,0,0,0,0],
        ];
        this.anchorPoints = [new XYLocation(10, 10)];
        // this.anchorPoints = [new XYLocation(3, 3)];
        this.headAnchorPoint = new XYLocation(1, 11);
        this.armAnchorPoints = [new XYLocation(3, 3), new XYLocation(4, 18)];
        this.waistAnchorPoint = new XYLocation(16, 9);
        // this.waistAnchorPoint = new XYLocation(5, 3);
        const frame = new SpriteFrame(data);
        this.sprite =  new Sprite([frame]);
    }
}