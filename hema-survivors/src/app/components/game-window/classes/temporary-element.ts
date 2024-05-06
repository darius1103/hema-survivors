import { XYLocation } from "./xylocation";

export class TemporaryElement {
    private lifetime: number;
    private creationTime: number;
    private location: XYLocation;

    constructor(lifetime: number, location: XYLocation) {
        this.lifetime = lifetime;
        this.location = location;
        this.creationTime = Date.now();
    }

    public expired(): boolean {
        return Date.now() - this.lifetime > this.creationTime;
    }

    public getLocation(): XYLocation {
        return this.location;
    }
}