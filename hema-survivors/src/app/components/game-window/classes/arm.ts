import { BodyPart } from "./body-part";
import { WeaponV1 } from "./main-weapon";
import { SpriteV1 } from "./sprite";
import { SpriteFrame } from "./sprite-frame";
import { XYLocation } from "./xylocation";

export class ArmV1 extends BodyPart {
    protected weaponAnchorPoints: XYLocation[] = [];

    protected gloves: boolean = true;
    protected gloveAnchor: XYLocation = null as any;
    protected gloveOverlay: number[][] = null as any;

    protected sleave: boolean = false;
    protected sleaveAnchor: XYLocation = null as any;
    protected sleaveOverlay: number[][] = null as any;

    protected albowProtection: boolean = false;
    protected albowAnchor: XYLocation = null as any;
    protected albowOverlay: number[][] = null as any;

    protected guard: boolean = false;
    protected guardAnchor: XYLocation = null as any;
    protected guardOverlay: number[][] = null as any;

    protected weapon: WeaponV1 | null = null;
    
    constructor(weapon: WeaponV1 | null = null) {
        super();
        // this.gloves = Math.floor(Math.random() * 100) % 2 == 0;
        // this.sleave = Math.floor(Math.random() * 100) % 2 == 0;
        // this.albowProtection = Math.floor(Math.random() * 100) % 2 == 0;
        // this.guard = Math.floor(Math.random() * 100) % 2 == 0;
        
        this.weapon = weapon;
        this.instanciate();
        this.defineSprite();
    }
    
    public getWeapon(): WeaponV1 | null {
        return this.weapon;
    }
    
    public getWeaponAnchorPoints(): XYLocation[] {
        return this.weaponAnchorPoints;
    }
    
    public instanciate(): void {
        this.anchorPoints = [new XYLocation(0, 6)];
        this.weaponAnchorPoints = [new XYLocation(5, 2)];
    };

    public defineSprite(): void {
        this.data = this.addSleave();
        this.data = this.addGuard();
        this.data = this.addElbow();
        this.data = this.addGloves();
        this.data = this.addWeapon();
        const frame = new SpriteFrame(this.data);
        this.sprite =  new SpriteV1([frame]);
    }

    public addGloves(): number[][] {
        if (!this.gloves || !this.gloveAnchor || !this.gloveOverlay) {
            return this.data;
        }
        return this.appendBodyPart({
            targetFrameData: this.data, 
            sourceFrameData: this.gloveOverlay, 
            anchorPoint: this.gloveAnchor,
            innerAnchorPoint: new XYLocation(0, 0),
            index: 0, 
            under: false}
        );
    }

    public addElbow(): number[][] {
        if (!this.albowProtection || !this.albowAnchor || !this.albowOverlay) {
            return this.data;
        }
        return this.appendBodyPart({
            targetFrameData: this.data, 
            sourceFrameData: this.albowOverlay, 
            anchorPoint: this.albowAnchor,
            innerAnchorPoint: new XYLocation(0, 0),
            index: 0, 
            under: false}
        );
    }

    public addGuard(): number[][] {
        if (!this.guard || !this.guardAnchor || !this.guardOverlay) {
            return this.data;
        }
        return this.appendBodyPart({
            targetFrameData: this.data, 
            sourceFrameData: this.guardOverlay, 
            anchorPoint: this.guardAnchor,
            innerAnchorPoint: new XYLocation(0, 0),
            index: 0, 
            under: false}
        );
    }

    public addWeapon(): number[][] {
        if (!this.weapon || this.weaponAnchorPoints.length == 0) {
            return this.data;
        }
        return this.appendBodyPart({
            targetFrameData: this.data, 
            sourceFrameData: this.weapon?.getSprite().frames[0].data as any, 
            anchorPoint: this.weaponAnchorPoints[0],
            innerAnchorPoint: this.weapon?.getAnchorPoints()[0] as any,
            index: 0, 
            under: true}
        );
    }

    public addSleave(): number[][] {
        if (!this.sleave || !this.sleaveAnchor || !this.sleaveOverlay) {
            return this.data;
        }
        return this.appendBodyPart({
            targetFrameData: this.data, 
            sourceFrameData: this.sleaveOverlay, 
            anchorPoint: this.sleaveAnchor,
            innerAnchorPoint: new XYLocation(0, 0),
            index: 0, 
            under: false}
        );
    }
}