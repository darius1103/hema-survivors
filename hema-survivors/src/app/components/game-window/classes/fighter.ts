import { range } from "rxjs";
import { PIXEL_SIZE, SPRITE_SIZE } from "../utils/globals";
import { SpriteV1 } from "./sprite";
import { SpriteFrame } from "./sprite-frame";
import { FighterSettings } from "../utils/fitherSettings";
import { Color } from "../utils/color";
import { Box } from "./common/box";
import { XY } from "./common/x-y";

export class Fighter{
    public settings: FighterSettings = {
        primaryColor: Color.WHITE,
        secondaryColor: Color.RED,
        thirdColor: Color.AROS_GREEN
    }
    public spriteRTL: SpriteV1 = null as any;
    public spriteLTR: SpriteV1 = null as any;
    public hitBoxesRTL: Box[] = [];
    public hitBoxesLTR: Box[] = [];
    private attackBoxRTL: Box[] = [];
    private attackBoxLTR: Box[] = [];
    private adjustedAttackBox: Box[] = [];
    private adjustedHitBoxes: Box[] = [];

    constructor() {
        this.defineSprite();
    }

    public attemptAttack(attackBoxes: Box[], damage: number, location: XY, facingRight: boolean = true): boolean {
        this.adjustedHitBoxes = this.mapBoxesToAbsolute(this.hitBoxesRTL, location);
        return this.adjustedHitBoxes
            .some((box) => this.checkColision(box, attackBoxes));
    }

    public checkColision(box1: Box, boxes: Box[]): boolean {
        return boxes.some((box2) => {
            // no horizontal overlap
            if (box1.p1.x >= box2.p2.x || box2.p1.x >= box1.p2.x) return false;

            // no vertical overlap
            if (box1.p1.y >= box2.p2.y || box2.p1.y >= box1.p2.y) return false;

            return true;
        });
    }

    public getAdjustedAttackBox(): Box[] {
        return this.adjustedAttackBox;
    }

    public getAdjustedHitBoxes(): Box[] {
        return this.adjustedHitBoxes;
    }

    private mapBoxesToAbsolute(boxes: Box[], location: XY): Box[] {
        return boxes.map(box => this.mapBoxToAbsolute(box, location));
    }

    private mapBoxToAbsolute(box: Box, location: XY): Box {
        const x1 = location.x - ((SPRITE_SIZE * PIXEL_SIZE) / 2) + box.p1.x;
        const y1 = location.y - ((SPRITE_SIZE * PIXEL_SIZE) / 2) + box.p1.y;
        const x2 = location.x - ((SPRITE_SIZE * PIXEL_SIZE) / 2) + box.p2.x;
        const y2 = location.y - ((SPRITE_SIZE * PIXEL_SIZE) / 2) + box.p2.y;
        return {p1: {x: x1, y: y1}, p2: {x: x2, y: y2}};
    }

    private determineAttackRange(ownLocation: XY): string[] {
        const ownXID = Math.floor(ownLocation.x / 50);
        const ownYID = Math.floor(ownLocation.y / 50);
        const areas = [];
        const range = 3;
        for (let i = -range; i <= range; i ++) {
            for (let j = -range; j <= range; j ++) {
                areas.push((ownXID + i) + "-" + (ownYID - j))
            }
        }
        return areas;
    }

    public getAttackBoxesRTL(): Box[] {
        return this.attackBoxRTL;
    }

    public getAttackBoxesLTR(): Box[] {
        return this.attackBoxLTR;
    }

    public defineSprite(): void {
        // this.hitBoxes = [{p1: new XY(1, 1), p2: new XY((SPRITE_SIZE * PIXEL_SIZE), (SPRITE_SIZE * PIXEL_SIZE))}];
    }
    
    public getSpriteRTL(): SpriteV1 {
        return this.spriteRTL;
    }

    public getSpriteLTR(): SpriteV1 {
        return this.spriteLTR;
    }

    public getHitBoxesRTL(): Box[] {
        return this.hitBoxesRTL;
    }

    public getHitBoxesLTR(): Box[] {
        return this.hitBoxesLTR;
    }
}