import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { BodyPart } from '../classes/body-part';
import { Torso } from '../classes/torso';
import { Fighter } from '../classes/fighter';
import { Sprite } from '../classes/sprite';
import { SpriteFrame } from '../classes/sprite-frame';
import { XYLocation } from '../classes/xylocation';
import { colorsTable } from '../utils/colorLookUp';
import { DEBUG_MODE, PIXEL_HEIGHT } from '../utils/globals';

@Injectable({
  providedIn: 'root'
})
export class SpriteDrawingService {

  constructor() { }

  public draw(ctx: CanvasRenderingContext2D, sprite: Sprite): void {
    console.log(sprite);
    for (let i = 0; i < sprite.frames.length; i++) {
      this.drawFrame(ctx, sprite.frames[i], i);   
    }
  }

  private drawFrame(ctx: CanvasRenderingContext2D, frame: SpriteFrame, offset: number = 0): void {
    const frameHeight = frame.data.length * PIXEL_HEIGHT;
    const frameWidth = frame.data[0].length * PIXEL_HEIGHT;
    for (let i: number = 0; i < frame.data.length; i++) {
      const frameRow = frame.data[i]
      for (let j: number = 0; j < frameRow.length; j++) {
        if (!colorsTable.has(frameRow[j])) {
            ctx.fillStyle = "rgba(233, 233, 233, 0)";
            continue;
        }
        ctx.beginPath();
        ctx.rect(
        PIXEL_HEIGHT * j + offset * frameWidth,
        PIXEL_HEIGHT * i,
        PIXEL_HEIGHT,
        PIXEL_HEIGHT);
        ctx.fillStyle = colorsTable.get(frameRow[j]) as any;
        ctx.fill();
      }
    }
    if (DEBUG_MODE) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(frameWidth, frameHeight);
      ctx.stroke();
    }
  }

  public writeFrame(ctx: CanvasRenderingContext2D, frame: SpriteFrame, offset: number = 0): void {
    frame.data.forEach((row: number[], rowIndex: number) => {
      row.forEach((value: number, columnIndex: number) => {
          ctx.font = value ? "12px Arial" : "4px Arial";
          ctx.fillStyle = colorsTable.get(frame.data[rowIndex][columnIndex]) ? colorsTable.get(frame.data[rowIndex][columnIndex]) as any : "black";
          ctx.fillText(value.toString(), 10 * (columnIndex + 1), 10 * (rowIndex + 1));
      });
    });
  }

  public drawFighter(ctx:CanvasRenderingContext2D, fighter: Fighter): void {
    this.drawBodyPart(ctx, fighter.torso.waistAnchorPoint, fighter.waist);
    this.drawChest(ctx, fighter.torso);
    this.drawBodyPart(ctx, fighter.torso.headAnchorPoint, fighter.head);
    fighter.arms.forEach((arm, index) => {
      const weapon = arm.getWeapon();
      if (weapon) {
        const handRelativeToBody = new XYLocation(
          arm.getWeaponAnchorPoints()[0].x + fighter.torso.armAnchorPoints[index].x, 
          arm.getWeaponAnchorPoints()[0].y + fighter.torso.armAnchorPoints[index].y);
        this.drawBodyPart(ctx, handRelativeToBody, weapon);
      }
      this.drawBodyPart(ctx, fighter.torso.armAnchorPoints[index], arm);
    });
    // fighter.legs.forEach((leg, index) => {
    //   const waistRelativeToBody = new XYLocation(
    //     fighter.waist.legsAnchorPoints[index].x + fighter.torso.waistAnchorPoint.x, 
    //     fighter.waist.legsAnchorPoints[index].y + fighter.torso.waistAnchorPoint.y);
    //   this.drawBodyPart(ctx, waistRelativeToBody, leg);
    // });
  }

  public drawChest(ctx:CanvasRenderingContext2D, torso: Torso): void {
    const index = 0;
    const spriteSize = 64;
    const center = spriteSize / 2;

    const torsoFrame = torso.getSprite().frames[index];
    const torsoAnchor = torso.getAnchorPoints()[index];

    const frameHeight = torsoFrame.data.length;
    const frameWidth = torsoFrame.data[0].length;

    for (let i: number = 0; i < spriteSize; i++) {
      for (let j: number = 0; j < spriteSize; j++) {
        ctx.beginPath();
        ctx.rect(
        PIXEL_HEIGHT * j,
        PIXEL_HEIGHT * i,
        PIXEL_HEIGHT,
        PIXEL_HEIGHT);
        ctx.fillStyle = "yellow";
        const adjustX = (i + torsoAnchor.y - center);
        const adjustY = (j + torsoAnchor.x - center);
        if (
          (adjustX >= 0 && adjustX < frameHeight) &&
          (adjustY >= 0 && adjustY < frameWidth) 
        ) {
          if (colorsTable.has(torsoFrame.data[adjustX][adjustY])) {
            ctx.fillStyle = colorsTable.get(torsoFrame.data[i + torsoAnchor.y - center][j + torsoAnchor.x - center]) as any;
            ctx.fill();
          }
        }
      }
    }
  }

  public drawBodyPart(ctx: CanvasRenderingContext2D, torsoAnchorPoint: XYLocation, part: BodyPart) {
    const index = 0;
    const spriteSize = 64;
    const center = spriteSize / 2;

    const partFrame = part.getSprite().frames[index];
    const partAnchor = new XYLocation(
      part.getAnchorPoints()[index].x - torsoAnchorPoint.x, 
      part.getAnchorPoints()[index].y - torsoAnchorPoint.y);

    const frameHeight = partFrame.data.length;
    const frameWidth = partFrame.data[0].length;

    for (let i: number = 0; i < spriteSize; i++) {
      for (let j: number = 0; j < spriteSize; j++) {
        ctx.beginPath();
        ctx.rect(
        PIXEL_HEIGHT * j,
        PIXEL_HEIGHT * i,
        PIXEL_HEIGHT,
        PIXEL_HEIGHT);
        ctx.fillStyle = "green";
        const adjustX = (i + partAnchor.x - center);
        const adjustY = (j + partAnchor.y - center);
        if (
          (adjustX >= 0 && adjustX < frameHeight) &&
          (adjustY >= 0 && adjustY < frameWidth) 
        ) {
          if (DEBUG_MODE) {
                console.log(partFrame.data[adjustX][adjustY]);
                console.log(i);
                console.log(j);
                console.log(partAnchor);
                console.log(torsoAnchorPoint);
          }
          if (colorsTable.has(partFrame.data[adjustX][adjustY])) {
            ctx.fillStyle = colorsTable.get(partFrame.data[adjustX][adjustY]) as any;
            ctx.fill();
          }
        }
      }
    }
  }
}
