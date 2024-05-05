import { Character } from "./character";
import { Fighter } from "./fighter";
import { XYLocation } from "./xylocation";

export class Player extends Character {
    constructor(innitialLocation: XYLocation, fighter: Fighter) {
        super(innitialLocation, fighter);
        super.setSpeed(1);
    }
}