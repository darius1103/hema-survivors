import { range } from "rxjs";
import { SPRITE_SIZE } from "../utils/globals";
import { Arm } from "./arm";
import { BodyPart } from "./body-part";
import { Chest } from "./chest";
import { Head } from "./head";
import { MainHand } from "./main-hand";
import { Weapon } from "./main-weapon";
import { OffHand } from "./off-hand";
import { Sprite } from "./sprite";
import { SpriteFrame } from "./sprite-frame";
import { Waist } from "./waist";
import { XYLocation } from "./xylocation";

export class Fighter{
    public head: Head = new Head();
    public weapon: Weapon = new Weapon();
    public arms: Arm[] = [new MainHand(this.weapon), new OffHand()];
    public chest: Chest = new Chest();
    public waist: Waist = new Waist();
    public sprite: Sprite = null as any;

    constructor() {
        this.defineSprite();
    }

    public defineSprite(): void {
        let frameData: number[][] = [];
        range(1, SPRITE_SIZE).forEach(() => frameData.push(new Array(SPRITE_SIZE).fill(0)));
        frameData = this.appendBodyPart(
            frameData, 
            this.waist, 
            this.relativeToChest(this.chest.waistAnchorPoint, 0), 
            0);
        frameData = this.appendBodyPart(
            frameData, 
            this.chest, 
            new XYLocation(0, 0),
            0);
        frameData = this.appendBodyPart(
            frameData,
            this.head,
            this.relativeToChest(this.chest.headAnchorPoint, 0),
            0
        );
        this.arms.forEach((arm: Arm, index: number) => {
            frameData = this.appendBodyPart(
                frameData,
                arm,
                this.relativeToChest(this.chest.armAnchorPoints[index], 0),
                0
            );
        });
        this.sprite = new Sprite([new SpriteFrame(frameData)]);
    }

    public getSprite(): Sprite {
        return this.sprite;
    }

    private appendBodyPart(frameData: number[][], bodyPart: BodyPart, anchorPoint: XYLocation, index: number): number[][] {
        const bodyPartFrame = bodyPart.getSprite().frames[index];
        const bodyPartAnchor = bodyPart.getAnchorPoints()[index];
        const center = SPRITE_SIZE / 2;
        const deviationX = center + anchorPoint.x - bodyPartAnchor.x;
        const deviationY = center + anchorPoint.y - bodyPartAnchor.y;

        bodyPartFrame.data.forEach((row: number[], rowIndex: number) => {
            frameData[rowIndex + deviationX] = frameData[rowIndex + deviationX] ? frameData[rowIndex + deviationX] : [];
            row.forEach((value: number, columnIndex: number) => {
                if (value) {
                    frameData[rowIndex + deviationX][columnIndex + deviationY] = value;
                }
            });
        });
        return frameData;
    }

    private relativeToChest(partAnchor: XYLocation, index: number): XYLocation {
        return new XYLocation(
            partAnchor.x - this.chest.getAnchorPoints()[index].x,
            partAnchor.y - this.chest.getAnchorPoints()[index].y);
    }
}