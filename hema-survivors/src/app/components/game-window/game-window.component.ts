import { Component, ViewChild } from '@angular/core';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { Color } from '../../utils/color';

@Component({
  selector: 'app-game-window',
  standalone: true,
  imports: [],
  templateUrl: './game-window.component.html',
  styleUrl: './game-window.component.scss'
})
export class GameWindowComponent {
  @ViewChild('canvas') canvas: any = null;
  WIDTH = 500;
  HEIGHT = 500;
  ctx: any;
  delay = 120; // 120 is about 1 frame per second :)
  currentFrame = 0;

  ngAfterViewInit() {
    if (this.canvas == null) {
        console.log('null canvas...')
        return;
    }
    this.canvas.nativeElement.width = this.WIDTH;
    this.canvas.nativeElement.height = this.HEIGHT;
    console.log(this.canvas);

    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.startGame();
  }

  private startGame(): void {
    this.drawWater();
    window.requestAnimationFrame(() => this.animate());
  }

  private drawWater(): void {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.HEIGHT, this.WIDTH);
    this.ctx.fillStyle = Color.WATER;
    this.ctx.fill();
  }

  private animate(): void {
    if (this.currentFrame < this.delay) {
        this.currentFrame++;
        window.requestAnimationFrame(() => this.animate());
    } else {
      console.log("Ha ha ha!");
      this.currentFrame = 0;
      window.requestAnimationFrame(() => this.animate());
    }
  }
}
