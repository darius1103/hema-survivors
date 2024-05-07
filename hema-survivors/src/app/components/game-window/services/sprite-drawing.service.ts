import { Injectable } from '@angular/core';
import { Fighter } from '../classes/fighter';
import { SpriteFrame } from '../classes/sprite-frame';
import { TemporaryText } from '../classes/temporary-text';
import { Box } from '../utils/box';
import { codeToColor } from '../utils/colorLookUp';
import { DEBUG_MODE, PIXEL_SIZE } from '../utils/globals';

@Injectable({
  providedIn: 'root'
})
export class SpriteDrawingService {

  constructor() { }

  public draw(ctx: CanvasRenderingContext2D, fighter: Fighter, rtl: boolean = true): void {
    const sprite = rtl ? fighter.getSpriteRTL(): fighter.getSpriteLTR();
    for (let i = 0; i < sprite.frames.length; i++) {
      this.drawFrame(ctx, sprite.frames[i], i);   
    }
    this.drawHitBoxes(ctx, fighter, rtl);
  }

  private drawFrame(ctx: CanvasRenderingContext2D, frame: SpriteFrame, offset: number = 0): void {
    const frameHeight = frame.data.length * PIXEL_SIZE;
    const frameWidth = frame.data[0].length * PIXEL_SIZE;
    for (let i: number = 0; i < frame.data.length; i++) {
      const frameRow = frame.data[i]
      for (let j: number = 0; j < frameRow.length; j++) {
        if (!codeToColor.has(frameRow[j])) {
            ctx.fillStyle = "rgba(233, 233, 233, 0)";
            continue;
        }
        ctx.beginPath();
        ctx.rect(
        PIXEL_SIZE * j,
        PIXEL_SIZE * i + offset * frameWidth,
        PIXEL_SIZE,
        PIXEL_SIZE);
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

  private drawHitBoxes(ctx: CanvasRenderingContext2D, fighter: Fighter, rtl: boolean = true): void {
    this.drawBoxes(ctx, rtl ? fighter.getHitBoxesRTL() : fighter.getHitBoxesLTR(), "black");
    this.drawBoxes(ctx, rtl ? fighter.getAttackBoxesRTL() : fighter.getAttackBoxesLTR() , "red");
  }

  public drawBoxes(ctx: CanvasRenderingContext2D, boxes: Box[], style: string): void {
    boxes.forEach((box) => {
      ctx.lineWidth = 1;
      ctx.strokeStyle = style;
      ctx.strokeRect(
        box.topL.x, 
        box.topL.y, 
        (box.bottomR.x - box.topL.x),
        (box.bottomR.y - box.topL.y)
      );
    });
  }

  public drawTexts(ctx: CanvasRenderingContext2D, temporaryTexts: TemporaryText[]): void {
    temporaryTexts.forEach((text: TemporaryText) => {
        ctx.font = text.getStyle();
        ctx.fillStyle = text.getColor();
        ctx.fillText(text.getMessage(), text.getLocation().x, text.getLocation().y);
    });
  }
}
