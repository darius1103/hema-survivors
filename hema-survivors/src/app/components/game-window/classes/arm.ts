import { BodyPart } from "./body-part";
import { Weapon } from "./main-weapon";
import { Sprite } from "./sprite";
import { SpriteFrame } from "./sprite-frame";
import { XYLocation } from "./xylocation";

export class Arm extends BodyPart {
    protected weaponAnchorPoints: XYLocation[] = [];
    protected sleave: boolean = false;
    protected gloves: boolean = false;
    protected weapon: Weapon | null = null;
    
    constructor(weapon: Weapon | null = null) {
        super();
        this.weapon = weapon;
        this.defineSprite();
    }
    
    public getWeapon(): Weapon | null {
        return this.weapon;
    }
    
    public getWeaponAnchorPoints(): XYLocation[] {
        return this.weaponAnchorPoints;
    }
    
    public defineSprite(): void {
        this.anchorPoints = [new XYLocation(0, 6)];
        this.weaponAnchorPoints = [new XYLocation(5, 2)];
        const frame = new SpriteFrame([[]]);
        this.sprite =  new Sprite([frame]);
    }
}