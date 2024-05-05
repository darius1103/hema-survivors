import { Observable } from "rxjs";
import { Character } from "./character";
import { Fighter } from "./fighter";
import { XYLocation } from "./xylocation";

export class Enemy extends Character  {
    private lastKnownPlayerLocation: XYLocation = null as any;
    private id: string;

    constructor(innitialLocation: XYLocation, stream: Observable<XYLocation>, fighter: Fighter, id: string) {
        super(innitialLocation, fighter);
        this.id = id;
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

    public getId(): string {
        return this.id;
    }
}