import { Observable } from "rxjs";
import { Color } from "../utils/color";
import { ControlStatus } from "../utils/control-status";
import { Footprint } from "../utils/footPrint";
import { XYLocation } from "./xylocation";

export class Player {
    absolutePosition: XYLocation = new XYLocation(0, 0);
    controlStatus: ControlStatus = null as any;
    oldAbsolutePosition: XYLocation = new XYLocation(0, 0);
    width: number = 10;
    height: number = 20;
    speed: number = 2;

    constructor(innitialLocation: XYLocation) {;
        this.absolutePosition = innitialLocation;
    }

    public control(stream: Observable<ControlStatus>): void {
        stream.subscribe((status) => this.controlStatus = status);
    }

    public move(topLeftCorner: XYLocation, bottomRightCorner: XYLocation): XYLocation {
        // Primary movemnt up down
        var deltaY = 0;
        deltaY += this.controlStatus.DOWN ? 1 : 0;
        deltaY += this.controlStatus.UP ? -1 : 0;
        
        var deltaX = 0;
        deltaX += this.controlStatus.RIGHT ? 1 : 0;
        deltaX += this.controlStatus.LEFT ? -1 : 0;
        // Adjust for diagonal movement
        const square = 1/Math.sqrt(2);
        deltaX *= this.controlStatus.LEFT || this.controlStatus.RIGHT ? square : 1;
        deltaY *= this.controlStatus.UP || this.controlStatus.DOWN ? square : 1;

        // Adjust for seepd
        deltaX *= this.speed;
        deltaY *= this.speed;

        this.adjustIfInBounds(topLeftCorner, bottomRightCorner, deltaX, deltaY);
        return this.oldAbsolutePosition;
    }

    private adjustIfInBounds(topLeftCorner: XYLocation, bottomRightCorner: XYLocation, deltaX: number, deltaY: number): void {
        const sideSpacing = [
            this.width / 2 + 5, 
            this.height / 2 + 5];
        var adjustedX = this.absolutePosition.x + deltaX;
        if (adjustedX < topLeftCorner.x + sideSpacing[0]) {
            adjustedX = topLeftCorner.x + sideSpacing[0];
        } else if (adjustedX > bottomRightCorner.x - sideSpacing[0]) {
            adjustedX = bottomRightCorner.x - sideSpacing[0];
        }
        
        var adjustedY = this.absolutePosition.y + deltaY;
        if (adjustedY < topLeftCorner.y + sideSpacing[1]) {
            adjustedY = topLeftCorner.y + sideSpacing[1];
        } else if (adjustedY > bottomRightCorner.y - sideSpacing[1]) {
            adjustedY = bottomRightCorner.y - sideSpacing[1];
        }

        this.absolutePosition.x = adjustedX;
        this.absolutePosition.y = adjustedY;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.rect(
            this.absolutePosition.x - this.width/2, 
            this.absolutePosition.y - this.height/2,
            this.width,
            this.height);
        this.oldAbsolutePosition = this.absolutePosition;
        ctx.fillStyle = Color.DUCK;
        ctx.fill();
    }
}