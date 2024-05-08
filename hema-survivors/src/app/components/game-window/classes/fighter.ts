import { range } from "rxjs";
import { PIXEL_SIZE, SPRITE_SIZE } from "../utils/globals";
import { ArmV1 } from "./arm";
import { BodyPart } from "./body-part";
import { Torso } from "./torso";
import { HeadV1 } from "./head";
import { MainHand } from "./main-hand";
import { WeaponV1 } from "./main-weapon";
import { OffHand } from "./off-hand";
import { SpriteV1 } from "./sprite";
import { SpriteFrame } from "./sprite-frame";
import { Waist } from "./waist";
import { XYLocation } from "./xylocation";
import { FighterSettings } from "../utils/fitherSettings";
import { Color } from "../utils/color";
import { BoxV1 } from "../utils/box";
import { Enemy } from "./enemy";

export class Fighter{
    public settings: FighterSettings = {
        primaryColor: Color.WHITE,
        secondaryColor: Color.RED,
        thirdColor: Color.AROS_GREEN
    }
    public head: HeadV1 = new HeadV1();
    public weapon: WeaponV1 = new WeaponV1();
    public arms: ArmV1[] = [new MainHand(this.weapon), new OffHand()];
    public torso: Torso = new Torso(this.settings);
    public waist: Waist = new Waist(this.settings);
    public spriteRTL: SpriteV1 = null as any;
    public spriteLTR: SpriteV1 = null as any;
    public hitBoxesRTL: BoxV1[] = [];
    public hitBoxesLTR: BoxV1[] = [];
    private attackBoxRTL: BoxV1[] = [];
    private attackBoxLTR: BoxV1[] = [];
    private adjustedAttackBox: BoxV1[] = [];
    private adjustedHitBoxes: BoxV1[] = [];
    private lastAttack: number = 0;
    private attackDelay: number = 2000;

    constructor() {
        this.defineSprite();
    }

    public attack(hitAreas: Map<string, Map<string, Enemy>>, ownLocation: XYLocation, facingRight: boolean = true): void {
        if (Date.now() - this.lastAttack < this.attackDelay) {
            return;
        }
        this.lastAttack = Date.now();
        const ids = this.determineAttackRange(ownLocation);
        const enemiesInRange = ids
         .filter(id => hitAreas.has(id))
         .map(id => hitAreas.get(id))
         .filter((area: any) => area || area.size === 0)
         .flatMap((area: any) => Array.from(area.values()));
        if (enemiesInRange.length == 0) {
            console.log("no enemies in range");
            this.adjustedAttackBox = [];
            return;
        }
        console.log("Enemies in range: " + enemiesInRange.length);
        this.adjustedAttackBox = this.mapBoxesToAbsolute(facingRight ? this.attackBoxRTL :  this.attackBoxLTR, ownLocation);
        enemiesInRange
            .forEach((enemy: any) => (enemy as Enemy)
                .attemptAttack(this.adjustedAttackBox, 4));
    }

    public attemptAttack(attackBoxes: BoxV1[], damage: number, location: XYLocation, facingRight: boolean = true): boolean {
        this.adjustedHitBoxes = this.mapBoxesToAbsolute(this.hitBoxesRTL, location);
        return this.adjustedHitBoxes
            .some((box) => this.checkColision(box, attackBoxes));
    }

    public checkColision(box1: BoxV1, boxes: BoxV1[]): boolean {
        return boxes.some((box2) => {
            // no horizontal overlap
            if (box1.topL.x >= box2.bottomR.x || box2.topL.x >= box1.bottomR.x) return false;

            // no vertical overlap
            if (box1.topL.y >= box2.bottomR.y || box2.topL.y >= box1.bottomR.y) return false;

            return true;
        });
    }

    public getAdjustedAttackBox(): BoxV1[] {
        return this.adjustedAttackBox;
    }

    public getAdjustedHitBoxes(): BoxV1[] {
        return this.adjustedHitBoxes;
    }

    private mapBoxesToAbsolute(boxes: BoxV1[], location: XYLocation): BoxV1[] {
        return boxes.map(box => this.mapBoxToAbsolute(box, location));
    }

    private mapBoxToAbsolute(box: BoxV1, location: XYLocation): BoxV1 {
        const x1 = location.x - ((SPRITE_SIZE * PIXEL_SIZE) / 2) + box.topL.x;
        const y1 = location.y - ((SPRITE_SIZE * PIXEL_SIZE) / 2) + box.topL.y;
        const x2 = location.x - ((SPRITE_SIZE * PIXEL_SIZE) / 2) + box.bottomR.x;
        const y2 = location.y - ((SPRITE_SIZE * PIXEL_SIZE) / 2) + box.bottomR.y;
        return {topL: new XYLocation(x1 ,y1), bottomR: new XYLocation(x2 ,y2)};
    }

    private determineAttackRange(ownLocation: XYLocation): string[] {
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

    public getAttackBoxesRTL(): BoxV1[] {
        return this.attackBoxRTL;
    }

    public getAttackBoxesLTR(): BoxV1[] {
        return this.attackBoxLTR;
    }

    public defineSprite(): void {
        let frameData: number[][] = [];
        range(1, SPRITE_SIZE).forEach(() => frameData.push(new Array(SPRITE_SIZE).fill(0)));
        frameData = this.appendBodyPart(
            frameData, 
            this.waist, 
            this.relativeToChest(this.torso.waistAnchorPoint, 0), 
            0);
        frameData = this.appendBodyPart(
            frameData, 
            this.torso, 
            new XYLocation(0, 0),
            0);
        frameData = this.appendBodyPart(
            frameData,
            this.head,
            this.relativeToChest(this.torso.headAnchorPoint, 0),
            0
        );
        this.arms.forEach((arm: ArmV1, index: number) => {
            frameData = this.appendBodyPart(
                frameData,
                arm,
                this.relativeToChest(this.torso.armAnchorPoints[index], 0),
                0
            );
            this.attackBoxRTL = this.attackBoxRTL.concat((arm.getWeapon() ? arm.getWeapon()?.getAttackBox() : []) as any);
        });
        this.spriteRTL = new SpriteV1([new SpriteFrame(frameData)]);
        this.spriteLTR = new SpriteV1([new SpriteFrame(this.flipFrameData(frameData))]);
        this.getRTLBoxes();
        // this.hitBoxes = [{topL: new XYLocation(1, 1), bottomR: new XYLocation((SPRITE_SIZE * PIXEL_SIZE), (SPRITE_SIZE * PIXEL_SIZE))}];
    }
    
    public getSpriteRTL(): SpriteV1 {
        return this.spriteRTL;
    }

    public getSpriteLTR(): SpriteV1 {
        return this.spriteLTR;
    }

    public getHitBoxesRTL(): BoxV1[] {
        return this.hitBoxesRTL;
    }

    public getHitBoxesLTR(): BoxV1[] {
        return this.hitBoxesLTR;
    }

    private flipFrameData(data:  number[][]):  number[][]{
        const fliped: number[][] = [];
        data.forEach(row => fliped.push(row.slice().reverse()));
        return fliped;
    }

    private getRTLBoxes(): void {
        this.hitBoxesLTR = [];
        this.hitBoxesRTL.forEach(hitBox => {
            const topL = {x: SPRITE_SIZE * PIXEL_SIZE - hitBox.bottomR.x, y: hitBox.topL.y}; 
            const bottomR = {x: SPRITE_SIZE * PIXEL_SIZE - hitBox.topL.x, y: hitBox.bottomR.y};
            this.hitBoxesLTR.push({topL, bottomR});
        });

        this.attackBoxLTR = [];
        this.attackBoxRTL.forEach(attackBox => {
            const topL = {x: SPRITE_SIZE * PIXEL_SIZE - attackBox.bottomR.x, y: attackBox.topL.y}; 
            const bottomR = {x: SPRITE_SIZE * PIXEL_SIZE - attackBox.topL.x, y: attackBox.bottomR.y};
            this.attackBoxLTR.push({topL, bottomR});
        });
        
    }

    private appendBodyPart(frameData: number[][], bodyPart: BodyPart, anchorPoint: XYLocation, index: number): number[][] {
        const bodyPartFrame = bodyPart.getSprite().frames[index];
        const bodyPartAnchor = bodyPart.getAnchorPoints()[index];
        const center = SPRITE_SIZE / 2;
        const deviationX = center + anchorPoint.x - bodyPartAnchor.x;
        const deviationY = center + anchorPoint.y - bodyPartAnchor.y;
        let maxX = -999;
        let maxY = -999;

        bodyPartFrame.data.forEach((row: number[], rowIndex: number) => {
            frameData[rowIndex + deviationX] = frameData[rowIndex + deviationX] ? frameData[rowIndex + deviationX] : [];
            row.forEach((value: number, columnIndex: number) => {
                if (value) {
                    frameData[rowIndex + deviationX][columnIndex + deviationY] = value;
                    maxX = Math.max(maxX , columnIndex + deviationY + 1);
                    maxY = Math.max(maxY , rowIndex + deviationX + 1);
                }
            });
        });
        const topL = new XYLocation(deviationY * PIXEL_SIZE, deviationX * PIXEL_SIZE);
        const bottomR = new XYLocation(maxX * PIXEL_SIZE, maxY * PIXEL_SIZE);
        this.hitBoxesRTL.push({topL, bottomR});
        return frameData;
    }

    private relativeToChest(partAnchor: XYLocation, index: number): XYLocation {
        return new XYLocation(
            partAnchor.x - this.torso.getAnchorPoints()[index].x,
            partAnchor.y - this.torso.getAnchorPoints()[index].y);
    }
}