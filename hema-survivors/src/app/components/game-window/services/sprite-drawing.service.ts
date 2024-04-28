import { Injectable } from '@angular/core';
import { Sprite } from '../classes/sprite';
import { SpriteFrame } from '../classes/sprite-frame';
import { colorsTable } from '../utils/colorLookUp';
import { DEBUG_MODE, PIXEL_HEIGHT } from '../utils/globals';

@Injectable({
  providedIn: 'root'
})
export class SpriteDrawingService {

  constructor() { }

  public draw(ctx: CanvasRenderingContext2D, sprite: Sprite): void {
    this.drawFrame(ctx, sprite.frames[0]);   
  }

  private drawFrame(ctx: CanvasRenderingContext2D, frame: SpriteFrame): void {
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
        PIXEL_HEIGHT * j,
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
}
