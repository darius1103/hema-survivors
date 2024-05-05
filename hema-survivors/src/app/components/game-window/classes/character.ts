import { Observable } from "rxjs";
import { Box } from "../utils/box";
import { ControlStatus } from "../utils/control-status";
import { PIXEL_SIZE } from "../utils/globals";
import { FRAME_ONE, FRAME_TWO } from "../utils/sprite-data";
import { Fighter } from "./fighter";
import { Sprite } from "./sprite";
import { SpriteFrame } from "./sprite-frame";
import { XYLocation } from "./xylocation";

export class Character {
    private figther: Fighter;
    public absolutePosition: XYLocation = new XYLocation(0, 0);
    public controlStatus: ControlStatus = {UP: false, DOWN: false, LEFT: false, RIGHT: false};
    private oldAbsolutePosition: XYLocation = new XYLocation(0, 0);
    public width: number = 0;
    public height: number = 0;
    private speed: number = 1;
    private sprite: Sprite = new Sprite([]);
    private health: number = 10;

    constructor(innitialLocation: XYLocation, fighter: Fighter) {
        this.figther = fighter;
        this.absolutePosition.x = innitialLocation.x;
        this.absolutePosition.y = innitialLocation.y;
        this.defineSprinte();
    }

    public getFighter(): Fighter {
        return this.figther;
    }

    public attemptAttack(attackBoxes: Box[], damage: number): void {
       const gotHit = this.figther.attemptAttack(attackBoxes, damage, this.absolutePosition);
       console.log(gotHit ? "WE HAVE A HIT" :  "MISS")
    }
 
    public getAbsolutePositon(): XYLocation {
        return this.absolutePosition;
    }

    public getOldPositon(): XYLocation {
        return this.oldAbsolutePosition;
    }
    
    private defineSprinte(): void {
        this.sprite = new Sprite([new SpriteFrame(FRAME_ONE), new SpriteFrame(FRAME_TWO)]);
        this.height = FRAME_ONE.length * PIXEL_SIZE;
        this.width = FRAME_ONE[0].length * PIXEL_SIZE;
    }

    public getSprite(): Sprite {
        return this.sprite;
    }

    public setSpeed(speed: number): void {
        this.speed = speed;
    }

    public control(stream: Observable<ControlStatus>): void {
        stream.subscribe((status) => this.controlStatus = status);
    }

    public move(topLeftCorner: XYLocation, bottomRightCorner: XYLocation): XYLocation {
        // Primary movement up down
        var deltaY = 0;
        deltaY += this.controlStatus.DOWN ? 1 : 0;
        deltaY += this.controlStatus.UP ? -1 : 0;
        
        var deltaX = 0;
        deltaX += this.controlStatus.RIGHT ? 1 : 0;
        deltaX += this.controlStatus.LEFT ? -1 : 0;
        // Adjust for diagonal movement
        const square = 1/Math.sqrt(2);
        deltaX *= this.controlStatus.UP || this.controlStatus.DOWN ? square : 1;
        deltaY *= this.controlStatus.RIGHT || this.controlStatus.LEFT ? square : 1;

        // Adjust for seepd
        deltaX *= this.speed;
        deltaY *= this.speed;

        this.adjustIfInBounds(topLeftCorner, bottomRightCorner, deltaX, deltaY);
        return this.oldAbsolutePosition;
    }

    private adjustIfInBounds(topLeftCorner: XYLocation, bottomRightCorner: XYLocation, deltaX: number, deltaY: number): void {
        const sideSpacing = [
            this.width / 2, 
            this.height / 2];
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

    public draw(targetCtx: CanvasRenderingContext2D, sourceCtx: HTMLCanvasElement): void {
        const x = Math.round(this.absolutePosition.x - sourceCtx.width/2);
        const y = Math.round(this.absolutePosition.y - sourceCtx.height/2);
        targetCtx.drawImage(sourceCtx, x, y, sourceCtx.width, sourceCtx.height);
        this.oldAbsolutePosition.x = this.absolutePosition.x;
        this.oldAbsolutePosition.y = this.absolutePosition.y;
    }
}