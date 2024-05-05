import { Injectable } from '@angular/core';
import { Fighter } from '../classes/fighter';
import { SpriteFrame } from '../classes/sprite-frame';
import { codeToColor } from '../utils/colorLookUp';
import { DEBUG_MODE, PIXEL_HEIGHT } from '../utils/globals';

@Injectable({
  providedIn: 'root'
})
export class SpriteDrawingService {

  constructor() { }

  public draw(ctx: CanvasRenderingContext2D, fighter: Fighter): void {
    const sprite = fighter.getSprite();
    for (let i = 0; i < sprite.frames.length; i++) {
      this.drawFrame(ctx, sprite.frames[i], i);   
    }
    this.drawHitBoxes(ctx, fighter);
  }

  private drawFrame(ctx: CanvasRenderingContext2D, frame: SpriteFrame, offset: number = 0): void {
    const frameHeight = frame.data.length * PIXEL_HEIGHT;
    const frameWidth = frame.data[0].length * PIXEL_HEIGHT;
    for (let i: number = 0; i < frame.data.length; i++) {
      const frameRow = frame.data[i]
      for (let j: number = 0; j < frameRow.length; j++) {
        if (!codeToColor.has(frameRow[j])) {
            ctx.fillStyle = "rgba(233, 233, 233, 0)";
            continue;
        }
        ctx.beginPath();
        ctx.rect(
        PIXEL_HEIGHT * j,
        PIXEL_HEIGHT * i + offset * frameWidth,
        PIXEL_HEIGHT,
        PIXEL_HEIGHT);
        ctx.fillStyle = codeToColor.get(frameRow[j]) as any;
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
          ctx.fillStyle = codeToColor.get(frame.data[rowIndex][columnIndex]) ? codeToColor.get(frame.data[rowIndex][columnIndex]) as any : "black";
          ctx.fillText(value.toString(), 10 * (columnIndex + 1), 10 * (rowIndex + 1));
      });
    });
  }

  private drawHitBoxes(ctx: CanvasRenderingContext2D, fighter: Fighter): void {
    const boxes = fighter.getHitBoxes();
    boxes.forEach((box) => {
      ctx.lineWidth = 1;
      ctx.strokeRect(
        PIXEL_HEIGHT * box.topL.x, 
        PIXEL_HEIGHT * box.topL.y, 
        PIXEL_HEIGHT * (box.bottomR.x - box.topL.x),
        PIXEL_HEIGHT * (box.bottomR.y - box.topL.y)
      );
    });
    const attacKBoxes = fighter.getAttackBoxes();
    attacKBoxes.forEach((box) => {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "red";
      ctx.strokeRect(
        PIXEL_HEIGHT * box.topL.x, 
        PIXEL_HEIGHT * box.topL.y, 
        PIXEL_HEIGHT * (box.bottomR.x - box.topL.x),
        PIXEL_HEIGHT * (box.bottomR.y - box.topL.y)
      );
    });
  }
}
