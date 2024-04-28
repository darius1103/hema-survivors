import { Observable } from "rxjs";
import { Character } from "./character";
import { XYLocation } from "./xylocation";

export class Enemy extends Character  {
    private lastKnownPlayerLocation: XYLocation = null as any;

    constructor(innitialLocation: XYLocation, stream: Observable<XYLocation>) {
        super(innitialLocation);
        super.setSpeed(0.4);
        stream.subscribe((location) => {
            this.lastKnownPlayerLocation = location;
            this.determineControlStatus();
        });
    }

    public determineControlStatus(): void {
        const sideSpacing = [
            this.width * 0.1, 
            this.height * 0.1];
        this.controlStatus.UP = this.absolutePosition.y > this.lastKnownPlayerLocation.y + sideSpacing[0];
        this.controlStatus.DOWN = this.absolutePosition.y < this.lastKnownPlayerLocation.y - sideSpacing[0];
        this.controlStatus.LEFT = this.absolutePosition.x > this.lastKnownPlayerLocation.x + sideSpacing[1];
        this.controlStatus.RIGHT = this.absolutePosition.x < this.lastKnownPlayerLocation.x - sideSpacing[1];
    }
}