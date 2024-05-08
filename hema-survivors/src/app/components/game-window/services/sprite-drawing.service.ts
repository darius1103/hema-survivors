import { Injectable } from '@angular/core';
import { Box } from '../classes/common/box';
import { Character } from '../classes/display/characters/character';
import { PLAYER } from '../classes/display/characters/characters';
import { Fighter } from '../classes/fighter';
import { SpriteFrame } from '../classes/sprite-frame';
import { TemporaryText } from '../classes/temporary-text';
import { BoxV1 } from '../utils/box';
import { codeToColor } from '../utils/colorLookUp';
import { DEBUG_MODE, PIXEL_SIZE, SPRITE_HELPER } from '../utils/globals';

@Injectable({
  providedIn: 'root'
})
export class SpriteDrawingService {

  constructor() { }

  public draw(ctx: CanvasRenderingContext2D, character: Character, rtl: boolean = true): void {
    const combinedData = character.getSprite().getCombinedData(rtl, character.getConfig());
    this.drawFrame(ctx, SPRITE_HELPER.centerData(combinedData.data));
    this.drawBoxes(ctx, SPRITE_HELPER.centerBoxesH(combinedData.boxes), "black");
  }

  private drawFrame(ctx: CanvasRenderingContext2D, data: number[][], offset: number = 0): void {
    const frameHeight = data.length * PIXEL_SIZE;
    const frameWidth = data[0].length * PIXEL_SIZE;
    for (let i: number = 0; i < data.length; i++) {
      const frameRow = data[i] ? data[i] : [];
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

  public writeFrame(ctx: CanvasRenderingContext2D, ltr: boolean): void {
    const combinedData = PLAYER.getSprite().getCombinedData(ltr, PLAYER.getConfig());
    combinedData.data.forEach((row: number[], rowIndex: number) => {
      row.forEach((value: number, columnIndex: number) => {
        ctx.font = value ? "12px Arial" : "4px Arial";
        ctx.fillStyle = codeToColor.get(row[columnIndex]) ? codeToColor.get(row[columnIndex]) as any : "black";
        ctx.fillText(value.toString(), 10 * (columnIndex + 1), 10 * (rowIndex + 1));
      });
    });
    this.drawBoxesWrite(ctx, combinedData.boxes, "black");
  }

  public drawBoxes(ctx: CanvasRenderingContext2D, boxes: Box[], style: string): void {
    boxes.forEach((box) => {
      ctx.lineWidth = 1;
      ctx.strokeStyle = style;
      ctx.strokeRect(
        10 + box.p1.x * PIXEL_SIZE, 
        1 + box.p1.y * PIXEL_SIZE, 
        (box.p2.x - box.p1.x + 1) * PIXEL_SIZE,
        (box.p2.y - box.p1.y + 1) * PIXEL_SIZE
      );
    });
  }

  public drawBoxesWrite(ctx: CanvasRenderingContext2D, boxes: Box[], style: string): void {
    boxes.forEach((box) => {
      ctx.lineWidth = 1;
      ctx.strokeStyle = style;
      ctx.strokeRect(
        10 + box.p1.x * 10, 
        1 + box.p1.y * 10, 
        (box.p2.x - box.p1.x + 1) * 10,
        (box.p2.y - box.p1.y + 1) * 10
      );
    });
  }

  public drawBoxesV1(ctx: CanvasRenderingContext2D, boxes: BoxV1[], style: string): void {
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
