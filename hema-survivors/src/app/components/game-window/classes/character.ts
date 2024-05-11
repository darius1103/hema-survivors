import { ControlStatus } from "../utils/control-status";
import { EventsStreams } from "../utils/events-streams";
import { PIXEL_SIZE } from "../utils/globals";
import { FRAME_ONE, FRAME_TWO } from "../utils/sprite-data";
import { Box } from "./common/box";
import { XY } from "./common/x-y";
import { CharacterDisplay } from "./display/characters/character-display";
import { SpriteV1 } from "./sprite";
import { SpriteFrame } from "./sprite-frame";

export class Character {
    private id: string;
    private characterDisplayLTR: CharacterDisplay;
    private characterDisplayRTL: CharacterDisplay;

    public absolutePosition: XY = {x: 0, y: 0};
    public controlStatus: ControlStatus = {UP: false, DOWN: false, LEFT: false, RIGHT: false};
    private oldAbsolutePosition: XY = {x: 0, y: 0};
    public width: number = 0;
    public height: number = 0;

    private speed: number = 1;
    private sprite: SpriteV1 = new SpriteV1([]);
    
    private maxHealth: number = 10;
    private currentHealth: number = 10;
    private events$: EventsStreams;
    private facingRight: boolean = true;

    constructor(innitialLocation: XY, characterDisplay: CharacterDisplay, characterDisplayRTL: CharacterDisplay, id: string, events$: EventsStreams) {
        this.id = id;
        this.events$ = events$;
        this.characterDisplayLTR = characterDisplay;
        this.characterDisplayRTL = characterDisplayRTL;

        this.absolutePosition.x = innitialLocation.x;
        this.absolutePosition.y = innitialLocation.y;

        this.defineSprinte();
    }

    public getCharacterDisplay(rlt: boolean): CharacterDisplay {
        return rlt ? this.characterDisplayLTR: this.characterDisplayRTL;
    }

    public getFacingRight(): boolean {
        return this.facingRight;
    }

    // public attemptAttack(attackBoxes: Box[], damage: number): void {
    //    const gotHit = this.figther.attemptAttack(attackBoxes, damage, this.absolutePosition, this.facingRight);
    //    if (gotHit) {
    //         this.events$.hit.next({
    //             text: damage.toString(),
    //             unit: this.figther,
    //             location: this.getAbsolutePositon()});
    //         this.currentHealth -= damage;
    //         if (this.currentHealth <= 0) {
    //             this.events$.death.next({
    //                 id: this.id, 
    //                 unit: this.figther});
    //         }
    //    }
    // }

    public getId(): string {
        return this.id;
    }
 
    public getAbsolutePositon(): XY {
        return this.absolutePosition;
    }

    public getOldPositon(): XY {
        return this.oldAbsolutePosition;
    }
    
    private defineSprinte(): void {
        this.sprite = new SpriteV1([new SpriteFrame(FRAME_ONE), new SpriteFrame(FRAME_TWO)]);
        this.height = FRAME_ONE.length * PIXEL_SIZE;
        this.width = FRAME_ONE[0].length * PIXEL_SIZE;
    }

    public getSprite(): SpriteV1 {
        return this.sprite;
    }

    public setSpeed(speed: number): void {
        this.speed = speed;
    }
    
    public move(p1eftCorner: XY, p2ightCorner: XY): XY {
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

        this.facingRight = deltaX === 0 ? this.facingRight : deltaX >= 0;

        this.adjustIfInBounds(p1eftCorner, p2ightCorner, deltaX, deltaY);
        return this.oldAbsolutePosition;
    }

    private adjustIfInBounds(p1eftCorner: XY, p2ightCorner: XY, deltaX: number, deltaY: number): void {
        const sideSpacing = [
            this.width / 2, 
            this.height / 2];
        var adjustedX = this.absolutePosition.x + deltaX;
        if (adjustedX < p1eftCorner.x + sideSpacing[0]) {
            adjustedX = p1eftCorner.x + sideSpacing[0];
        } else if (adjustedX > p2ightCorner.x - sideSpacing[0]) {
            adjustedX = p2ightCorner.x - sideSpacing[0];
        }
        
        var adjustedY = this.absolutePosition.y + deltaY;
        if (adjustedY < p1eftCorner.y + sideSpacing[1]) {
            adjustedY = p1eftCorner.y + sideSpacing[1];
        } else if (adjustedY > p2ightCorner.y - sideSpacing[1]) {
            adjustedY = p2ightCorner.y - sideSpacing[1];
        }

        this.absolutePosition.x = adjustedX;
        this.absolutePosition.y = adjustedY;
    }

    public draw(targetCtx: CanvasRenderingContext2D, sourceCtxRTL: HTMLCanvasElement, sourceCtxLTR: HTMLCanvasElement): void {
        const sourceCtx = this.facingRight ? sourceCtxRTL : sourceCtxLTR;
        const x = Math.round(this.absolutePosition.x - sourceCtx.width/2);
        const y = Math.round(this.absolutePosition.y - sourceCtx.height/2);
        targetCtx.drawImage(sourceCtx, x, y, sourceCtx.width, sourceCtx.height);
        this.oldAbsolutePosition.x = this.absolutePosition.x;
        this.oldAbsolutePosition.y = this.absolutePosition.y;
    }
}