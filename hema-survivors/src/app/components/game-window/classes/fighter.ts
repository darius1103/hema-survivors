import { range } from "rxjs";
import { SPRITE_SIZE } from "../utils/globals";
import { Arm } from "./arm";
import { BodyPart } from "./body-part";
import { Torso } from "./torso";
import { Head } from "./head";
import { MainHand } from "./main-hand";
import { Weapon } from "./main-weapon";
import { OffHand } from "./off-hand";
import { Sprite } from "./sprite";
import { SpriteFrame } from "./sprite-frame";
import { Waist } from "./waist";
import { XYLocation } from "./xylocation";
import { FighterSettings } from "../utils/fitherSettings";
import { Color } from "../utils/color";
import { Box } from "../utils/box";
import { Enemy } from "./enemy";

export class Fighter{
    public settings: FighterSettings = {
        primaryColor: Color.WHITE,
        secondaryColor: Color.RED,
        thirdColor: Color.AROS_GREEN
    }
    public head: Head = new Head();
    public weapon: Weapon = new Weapon();
    public arms: Arm[] = [new MainHand(this.weapon), new OffHand()];
    public torso: Torso = new Torso(this.settings);
    public waist: Waist = new Waist(this.settings);
    public sprite: Sprite = null as any;
    public hitBoxes: Box[] = [];
    private attackBox: Box[] = [];
    private lastAttack: number = 0;
    private attackDelay: number = 1;

    constructor() {
        this.defineSprite();
    }

    public attack(hitAreas: Map<string, Map<string, Enemy>>, ownLocation: XYLocation): void {
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
            return;
        }
        console.log("Enemies in range: " + enemiesInRange.length);
        enemiesInRange
            .forEach((enemy: any) => (enemy as Enemy)
                .attemptAttack(this.mapBoxesToAbsolute(this.attackBox, ownLocation), 2));
    }

    public attemptAttack(attackBoxes: Box[], damage: number, location: XYLocation): boolean {
        return this.mapBoxesToAbsolute(this.hitBoxes, location)
            .some((box) => this.checkColision(box, attackBoxes));
    }

    public checkColision(box1: Box, boxes: Box[]): boolean {
        return boxes.some((box2) => {
            // no horizontal overlap
            if (box1.topL.x >= box2.bottomR.x || box2.topL.x >= box1.bottomR.x) return false;

            // no vertical overlap
            if (box1.topL.y >= box2.bottomR.y || box2.topL.y >= box1.bottomR.y) return false;

            return true;
        });
    }

    private mapBoxesToAbsolute(boxes: Box[], location: XYLocation): Box[] {
        return boxes.map(box => this.mapBoxToAbsolute(box, location));
    }

    private mapBoxToAbsolute(box: Box, location: XYLocation): Box {
        const x1 = location.x - (SPRITE_SIZE / 2) + box.topL.x;
        const y1 = location.y - (SPRITE_SIZE / 2) + box.topL.y;
        const x2 = location.x - (SPRITE_SIZE / 2) + box.bottomR.x;
        const y2 = location.y - (SPRITE_SIZE / 2) + box.bottomR.y;
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

    public getAttackBoxes(): Box[] {
        return this.attackBox;
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
        this.arms.forEach((arm: Arm, index: number) => {
            frameData = this.appendBodyPart(
                frameData,
                arm,
                this.relativeToChest(this.torso.armAnchorPoints[index], 0),
                0
            );
            this.attackBox = this.attackBox.concat((arm.getWeapon() ? arm.getWeapon()?.getAttackBox() : []) as any);
        });
        this.sprite = new Sprite([new SpriteFrame(frameData)]);
        this.hitBoxes = [{topL: new XYLocation(1, 1), bottomR: new XYLocation(63, 63)}];
    }

    public getSprite(): Sprite {
        return this.sprite;
    }

    public getHitBoxes(): Box[] {
        return this.hitBoxes;
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
                    console.log({maxY, maxX});
                }
            });
        });
        const topL = new XYLocation(deviationY, deviationX);
        const bottomR = new XYLocation(maxX, maxY);
        this.hitBoxes.push({topL, bottomR});
        return frameData;
    }

    private relativeToChest(partAnchor: XYLocation, index: number): XYLocation {
        return new XYLocation(
            partAnchor.x - this.torso.getAnchorPoints()[index].x,
            partAnchor.y - this.torso.getAnchorPoints()[index].y);
    }
}