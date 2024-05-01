import { BodyPart } from "./body-part";
import { Sprite } from "./sprite";
import { SpriteFrame } from "./sprite-frame";
import { XYLocation } from "./xylocation";

export class Arm extends BodyPart {
    protected weaponAnchorPoints: XYLocation[] = [];
    protected sleave: boolean = false;
    protected gloves: boolean = false;

    constructor() {
        super();
        this.defineSprite();
    }

    public defineSprite(): void {
        this.anchorPoints = [new XYLocation(0, 6)];
        this.weaponAnchorPoints = [new XYLocation(5, 2)];
        const frame = new SpriteFrame([[]]);
        this.sprite =  new Sprite([frame]);
    }
}