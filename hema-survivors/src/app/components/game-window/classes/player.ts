import { Character } from "./character";
import { XYLocation } from "./xylocation";

export class Player extends Character {
    constructor(innitialLocation: XYLocation) {
        super(innitialLocation);
        super.setSpeed(0.5);
    }
}