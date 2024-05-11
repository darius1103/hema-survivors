import { XY } from "./common/x-y";

export class TemporaryElement {
    private lifetime: number;
    private creationTime: number;
    private location: XY;

    constructor(lifetime: number, location: XY) {
        this.lifetime = lifetime;
        this.location = location;
        this.creationTime = Date.now();
    }

    public expired(): boolean {
        return Date.now() - this.lifetime > this.creationTime;
    }

    public getLocation(): XY {
        return this.location;
    }
}