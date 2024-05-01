import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { BodyPart } from '../classes/body-part';
import { Chest } from '../classes/chest';
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

  public drawFighter(ctx:CanvasRenderingContext2D, fighter: Fighter): void {
    this.drawBodyPart(ctx, fighter.chest.waistAnchorPoint, fighter.waist);
    this.drawChest(ctx, fighter.chest);
    this.drawBodyPart(ctx, fighter.chest.headAnchorPoint, fighter.head);
    fighter.arms.forEach((arm, index) => {
      const weapon = arm.getWeapon();
      if (weapon) {
        const handRelativeToBody = new XYLocation(
          arm.getWeaponAnchorPoints()[0].x + fighter.chest.armAnchorPoints[index].x, 
          arm.getWeaponAnchorPoints()[0].y + fighter.chest.armAnchorPoints[index].y);
        this.drawBodyPart(ctx, handRelativeToBody, weapon);
      }
      this.drawBodyPart(ctx, fighter.chest.armAnchorPoints[index], arm);
    });
    fighter.legs.forEach((leg, index) => {
      const waistRelativeToBody = new XYLocation(
        fighter.waist.legsAnchorPoints[index].x + fighter.chest.waistAnchorPoint.x, 
        fighter.waist.legsAnchorPoints[index].y + fighter.chest.waistAnchorPoint.y);
      this.drawBodyPart(ctx, waistRelativeToBody, leg);
    });
  }

  public drawChest(ctx:CanvasRenderingContext2D, chest: Chest): void {
    const index = 0;
    const spriteSize = 64;
    const center = spriteSize / 2;

    const chestFrame = chest.getSprite().frames[index];
    const chestAnchor = chest.getAnchorPoints()[index];

    const frameHeight = chestFrame.data.length;
    const frameWidth = chestFrame.data[0].length;

    for (let i: number = 0; i < spriteSize; i++) {
      for (let j: number = 0; j < spriteSize; j++) {
        ctx.beginPath();
        ctx.rect(
        PIXEL_HEIGHT * j,
        PIXEL_HEIGHT * i,
        PIXEL_HEIGHT,
        PIXEL_HEIGHT);
        ctx.fillStyle = "yellow";
        const adjustX = (i + chestAnchor.y - center);
        const adjustY = (j + chestAnchor.x - center);
        if (
          (adjustX >= 0 && adjustX < frameHeight) &&
          (adjustY >= 0 && adjustY < frameWidth) 
        ) {
          if (colorsTable.has(chestFrame.data[adjustX][adjustY])) {
            ctx.fillStyle = colorsTable.get(chestFrame.data[i + chestAnchor.y - center][j + chestAnchor.x - center]) as any;
            ctx.fill();
          }
        }
      }
    }
  }

  public drawBodyPart(ctx: CanvasRenderingContext2D, chestAnchorPoint: XYLocation, part: BodyPart) {
    const index = 0;
    const spriteSize = 64;
    const center = spriteSize / 2;

    const partFrame = part.getSprite().frames[index];
    const partAnchor = new XYLocation(
      part.getAnchorPoints()[index].x - chestAnchorPoint.x, 
      part.getAnchorPoints()[index].y - chestAnchorPoint.y);

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
                console.log(chestAnchorPoint);
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
