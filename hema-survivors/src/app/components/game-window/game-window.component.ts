import { Component, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Border } from './classes/border';
import { Player } from './classes/player';
import { Color } from './utils/color';

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
  ctx: CanvasRenderingContext2D = null as any;
  delay = 120; // 120 is about 1 frame per second :)
  currentFrame = 0;
  player: Player = null as any;
  border: Border = null as any;
  controlKeys = 'wasd';

  constructor () {
    fromEvent(document, 'keydown')
      .pipe( takeUntilDestroyed())
      .subscribe(event => this.handleInput(event));
  }

  ngAfterViewInit() {
    if (this.canvas == null) {
        console.log('null canvas...')
        return;
    }
    this.player = new Player();
    this.border = new Border();
    this.canvas.nativeElement.width = this.WIDTH;
    this.canvas.nativeElement.height = this.HEIGHT;

   
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.startGame();
  }

  handleInput(event: any): void {
    if (this.controlKeys.indexOf(event.key) < 0) {
      return;
    }
    console.log(event);
  }

  private startGame(): void {
    this.drawWater();
    this.drawPlayerCharacter();
    this.drawBorders()
    // window.requestAnimationFrame(() => this.animate());
  }

  private drawWater(): void {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.HEIGHT, this.WIDTH);
    this.ctx.fillStyle = Color.WATER;
    this.ctx.fill();
  }

  private drawPlayerCharacter(): void {
    this.player.draw(this.ctx, this.HEIGHT/2, this.WIDTH/2);
  }

  private drawBorders(): void {
    this.border.draw(this.ctx);
  }

  private animate(): void {
    if (this.currentFrame < this.delay) {
      this.currentFrame++;
      window.requestAnimationFrame(() => this.animate());
    } else {
      console.log("Ha ha ha!");
      this.drawPlayerCharacter();
      this.currentFrame = 0;
      window.requestAnimationFrame(() => this.animate());
    }
  }
}
