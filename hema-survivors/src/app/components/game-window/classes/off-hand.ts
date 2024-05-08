import { ArmV1 } from "./arm";
import { WeaponV1 } from "./main-weapon";
import { XYLocation } from "./xylocation";

export class OffHand extends ArmV1 {

    constructor(weapon: WeaponV1 | null = null) {
        super(weapon);
    }

    public override instanciate(): void {
        this.data = [
            [0,0,0,0,0,0,0,0,7,7,0,0],
            [0,0,0,0,0,0,0,0,7,7,7,0],
            [0,0,0,0,0,0,0,0,7,7,7,2],
            [0,0,0,0,0,0,0,7,7,7,7,2],
            [7,7,7,7,0,0,2,7,7,7,7,2],
            [7,7,7,7,7,7,7,7,7,7,0,0],
            [0,0,0,7,7,7,7,7,7,0,0,0],
            [0,0,0,7,7,7,7,2,0,0,0,0],
        ];
        this.anchorPoints = [new XYLocation(0, 9)];
        this.gloveAnchor = new XYLocation(4, 0);
        this.gloveOverlay = [
            [2,2,2,2,0],
            [2,2,2,2,2],
            [0,0,2,2,2],
            [0,0,0,2,2]
        ];
        this.sleaveAnchor = new XYLocation(0, 0);
        this.sleaveOverlay = [
            [0,0,0,0,0,0,2,5,5,5,0,0],
            [0,0,0,0,0,0,0,2,5,5,5,0],
            [0,0,0,0,0,0,0,2,5,5,5,2],
            [0,0,0,0,0,0,0,5,5,5,5,2],
            [7,7,7,7,0,2,2,5,5,5,5,2],
            [7,7,7,7,5,5,5,5,5,5,2,0],
            [0,0,0,5,5,5,5,5,5,2,0,0],
            [0,0,0,2,5,5,5,2,0,0,0,0],
            [0,0,0,0,2,2,2,2,0,0,0,0],
        ];
        this.albowAnchor = new XYLocation(5, 6);
        this.albowOverlay = [
            [2,2,2,0],
            [2,2,2,2],
            [2,2,2,0],
        ];
        this.guardAnchor = new XYLocation(5, 3);
        this.guardOverlay = [
            [0,2,2,2,2,0,0,0,0],
            [0,2,2,2,2,0,0,0,0],
            [0,2,2,2,2,2,0,0,0],
            [0,2,2,2,2,0,0,0,0],
        ];
    }
}