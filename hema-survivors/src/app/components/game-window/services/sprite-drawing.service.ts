import { Injectable } from '@angular/core';
import { Sprite } from '../classes/sprite';
import { SpriteFrame } from '../classes/sprite-frame';
import { colorsTable } from '../utils/colorLookUp';
import { PIXEL_HEIGHT } from '../utils/globals';

@Injectable({
  providedIn: 'root'
})
export class SpriteDrawingService {

  constructor() { }

  public draw(ctx: CanvasRenderingContext2D, sprite: Sprite): void {
    this.drawFrame(ctx, sprite.frames[0]);   
    console.log('lala');
  }

  private drawFrame(ctx: CanvasRenderingContext2D, frame: SpriteFrame): void {
    const frameHeight = frame.data.length * PIXEL_HEIGHT;
    const frameWidth = frame.data[0].length * PIXEL_HEIGHT;
    ctx.translate(50, 50);
    const x = -frameWidth / 2;
    const y = -frameHeight / 2;
    for (let i: number = 0; i < frame.data.length; i++) {
      const frameRow = frame.data[i]
      for (let j: number = 0; j < frameRow.length; j++) {
        if (!colorsTable.has(frameRow[j])) {
            ctx.fillStyle = "rgba(233, 233, 233, 0)";
            continue;
        }
        ctx.beginPath();
        ctx.rect(
        x + PIXEL_HEIGHT * j,
        y + PIXEL_HEIGHT * i,
        PIXEL_HEIGHT,
        PIXEL_HEIGHT);
        ctx.fillStyle = colorsTable.get(frameRow[j]) as any;
        ctx.fill();
      }
    }
  }
}
