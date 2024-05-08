import { EventsStreams } from "../utils/events-streams";
import { Character } from "./character";
import { Fighter } from "./fighter";
import { XYLocation } from "./xylocation";

export class PlayerV1 extends Character {
    constructor(innitialLocation: XYLocation, fighter: Fighter, id: string, events$: EventsStreams) {
        super(innitialLocation, fighter, id, events$);
        super.setSpeed(1);
    }
}