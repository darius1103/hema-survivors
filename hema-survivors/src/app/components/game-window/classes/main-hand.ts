import { ArmV1 } from "./arm";
import { WeaponV1 } from "./main-weapon";
import { XYLocation } from "./xylocation";

export class MainHand extends ArmV1 {
    constructor(weapon: WeaponV1 | null = null) {
        super(weapon);
    }

    public override instanciate(): void {
        this.data = [
            [0,0,2,2,7,0,0,0,0,0,0,0,0],
            [0,0,2,7,7,7,0,0,0,0,0,0,0],
            [0,2,7,7,7,7,0,0,0,0,7,7,7],
            [0,2,7,7,7,0,0,0,0,7,7,7,7],
            [0,2,7,7,7,7,0,0,7,7,7,0,0],
            [0,2,2,7,7,7,7,7,7,7,7,0,0],
            [0,0,2,7,7,7,7,7,7,7,7,0,0],
            [0,0,0,0,7,7,7,7,7,0,0,0,0],
        ];
        this.anchorPoints = [new XYLocation(0, 4)];
        this.weaponAnchorPoints = [new XYLocation(5, 11)];
        this.gloveAnchor = new XYLocation(2, 8);
        this.gloveOverlay = [
            [0,0,2,2,2],
            [0,2,2,2,2],
            [2,2,2,0,0],
            [2,2,2,0,0]
        ];
        this.sleaveAnchor = new XYLocation(0, 0);
        this.sleaveOverlay = [
            [0,0,2,5,5,5,0,0,0,0,0,0,0],
            [0,0,2,5,5,5,2,0,0,0,0,0,0],
            [0,2,5,5,5,5,2,0,0,0,7,7,7],
            [0,2,5,5,5,2,0,0,0,7,7,7,7],
            [0,2,5,5,5,5,2,2,5,5,7,2,0],
            [0,2,2,5,5,5,5,5,5,5,5,2,0],
            [0,0,2,5,5,5,5,5,5,5,5,2,0],
            [0,0,0,0,5,5,5,5,5,2,0,0,0],
            [0,0,0,0,2,2,2,2,2,0,0,0,0],
        ];
        this.albowAnchor = new XYLocation(5, 3);
        this.albowOverlay = [
            [0,2,2,2],
            [2,2,2,2],
            [0,2,2,2],
        ];
        this.guardAnchor = new XYLocation(5, 6);
        this.guardOverlay = [
            [2,2,2,2,2],
            [2,2,2,2,2],
            [2,2,2,0,0],
        ];
    }
}