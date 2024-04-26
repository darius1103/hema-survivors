import { Observable, skip } from "rxjs";
import { colorsTable } from "../utils/colorLookUp";
import { ControlStatus } from "../utils/control-status";
import { Sprite } from "./sprite";
import { SpriteFrame } from "./sprite-frame";
import { XYLocation } from "./xylocation";

export class Player {
    absolutePosition: XYLocation = new XYLocation(0, 0);
    controlStatus: ControlStatus = null as any;
    oldAbsolutePosition: XYLocation = new XYLocation(0, 0);
    width: number = 10;
    height: number = 20;
    speed: number = 3;
    private sprite: Sprite = new Sprite([]);

    constructor(innitialLocation: XYLocation) {;
        this.absolutePosition = innitialLocation;
        this.defineSprinte();
    }

    private defineSprinte(): void {
        const data = [
            [0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,2,9,4,2,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,2,1,9,1,1,1,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,2,4,4,9,4,2,2,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,2,4,4,4,9,2,7,2,0,0,0,0,0,0,0],
            [0,0,0,2,2,2,2,4,4,4,4,9,7,7,2,0,0,0,0,0,0,0],
            [0,0,2,4,4,5,5,5,5,4,4,9,2,7,2,2,2,0,0,0,0,0],
            [0,0,2,7,7,4,5,5,5,9,9,9,9,9,2,5,4,2,0,0,0,0],
            [0,0,2,7,7,7,4,5,5,5,5,8,5,5,4,5,5,4,2,2,0,0],
            [0,2,7,7,7,7,5,5,5,5,7,7,7,5,4,5,5,4,7,7,2,0],
            [0,2,7,7,7,5,5,5,5,7,7,7,7,5,5,5,4,2,7,7,7,2],
            [0,2,7,7,7,7,5,5,7,7,7,8,5,5,5,5,2,7,7,7,7,2],
            [0,2,2,7,7,7,7,7,7,7,7,7,7,7,5,5,2,7,7,7,7,2],
            [0,0,2,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,0,0],
            [0,0,0,0,7,7,7,7,7,5,5,9,7,7,7,7,7,7,7,0,0,0],
            [0,0,0,0,2,7,7,7,5,5,5,9,5,7,7,7,7,2,0,0,0,0],
            [0,0,0,0,2,5,5,5,5,5,2,5,5,5,2,0,0,0,0,0,0,0],
            [0,0,0,2,5,5,5,5,5,5,5,5,5,5,2,0,0,0,0,0,0,0],
            [0,0,0,2,5,5,5,5,5,5,5,5,5,5,2,0,0,0,0,0,0,0],
            [0,0,2,5,5,5,5,5,5,5,2,5,5,5,5,2,0,0,0,0,0,0],
            [0,0,2,2,5,5,5,5,5,5,2,5,5,5,5,5,2,0,0,0,0,0],
            [0,0,2,5,2,5,5,5,5,2,2,5,5,2,2,2,0,0,0,0,0,0],
            [0,0,2,5,5,2,2,2,2,5,5,2,2,5,5,2,0,0,0,0,0,0],
            [0,0,2,5,5,5,5,5,5,5,5,5,5,5,5,2,0,0,0,0,0,0],
            [0,2,5,5,5,5,5,2,5,5,2,5,5,5,5,5,2,0,0,0,0,0],
            [0,2,5,5,5,5,5,2,2,2,2,5,5,5,5,5,2,2,0,0,0,0],
            [0,2,5,5,5,5,5,2,0,0,0,2,5,5,5,5,5,5,2,0,0,0],
            [0,2,5,5,5,5,5,2,0,0,0,0,2,5,5,5,5,5,5,2,0,0],
            [0,2,5,5,5,2,0,0,0,0,0,0,0,2,5,5,5,5,5,2,0,0],
            [2,5,5,5,5,5,2,0,0,0,0,0,0,0,2,5,5,5,5,2,0,0],
            [2,5,5,5,5,5,2,0,0,0,0,0,0,0,2,5,5,5,5,2,0,0],
            [2,5,5,5,5,5,2,0,0,0,0,0,0,2,5,5,5,5,2,0,0,0],
            [0,2,5,5,5,2,0,0,0,0,0,0,0,2,5,5,5,5,2,0,0,0],
            [0,2,5,5,5,2,0,0,0,0,0,0,0,2,5,5,5,2,0,0,0,0],
            [0,2,5,5,5,2,0,0,0,0,0,0,0,0,2,8,8,8,2,0,0,0],
            [0,2,8,8,8,8,2,0,0,0,0,0,0,0,2,8,8,8,8,2,0,0],
            [0,8,8,8,8,8,8,8,0,0,0,0,0,0,2,8,8,8,8,8,8,2],
        ];
        this.sprite = new Sprite([new SpriteFrame(data)]);
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
        this.drawPixel(ctx);
     }
 
     private drawPixel(ctx: CanvasRenderingContext2D): void {
         this.drawFrame(ctx, this.sprite.frames[0]);   
     }
 
     private drawFrame(ctx: CanvasRenderingContext2D, frame: SpriteFrame): void {
         const pixelSize = 1;
         const frameHeight = frame.data.length * pixelSize;
         const frameWidth = frame.data[0].length * pixelSize;
         const x = this.absolutePosition.x - frameWidth / 2;
         const y = this.absolutePosition.y - frameHeight / 2;
         
         for (let i: number = 0; i < frame.data.length; i++) {
             const frameRow = frame.data[i]
             for (let j: number = 0; j < frameRow.length; j++) {
                 if (!colorsTable.has(frameRow[j])) {
                    ctx.fillStyle = "rgba(233, 233, 233, 0)";
                    skip;
                 }
                 ctx.beginPath();
                 ctx.rect(
                 x + pixelSize * j,
                 y + pixelSize * i,
                 pixelSize,
                 pixelSize);
                 this.oldAbsolutePosition = this.absolutePosition;
                 ctx.fillStyle = colorsTable.get(frameRow[j]) as any;
                 ctx.fill();
             }
         }
     }
}