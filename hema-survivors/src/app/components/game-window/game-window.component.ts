import { Component, ViewChild } from '@angular/core';
import { fromEvent, BehaviorSubject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Border } from './classes/border';
import { Player } from './classes/player';
import { Color } from './utils/color';
import { ControlStatus } from './utils/control-status';
import { XYLocation } from './classes/xylocation';

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
  HEIGHT = 600;
  ctx: CanvasRenderingContext2D = null as any;
  delay = 0; // 120 is about 1 frame per second :)
  currentFrame = 0;
  player: Player = null as any;
  border: Border = null as any;
  controlKeys = 'wasd';
  control$: BehaviorSubject<ControlStatus>;
  topLeftCorner: XYLocation = new XYLocation(25, 25);
  bottomRightCorner: XYLocation = new XYLocation(375, 475);

  constructor () {
    this.control$ = new BehaviorSubject<ControlStatus>({UP: false, DOWN: false, LEFT: false, RIGHT: false});
    this.player = new Player({x: this.HEIGHT/2, y: this.WIDTH/2});
    this.player.control(this.control$.asObservable());
    this.border = new Border(this.topLeftCorner, this.bottomRightCorner);
    fromEvent(document, 'keydown')
      .pipe(takeUntilDestroyed())
      .subscribe(event => this.handleInput(event, 'keydown'));
    fromEvent(document, 'keyup')
      .pipe(takeUntilDestroyed())
      .subscribe(event => this.handleInput(event, 'keyup'));
  }

  ngAfterViewInit() {
    if (this.canvas == null) {
        console.log('null canvas...')
        return;
    }
    this.canvas.nativeElement.width = this.WIDTH;
    this.canvas.nativeElement.height = this.HEIGHT;
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.startGame();
  }

  handleInput(event: any, type: string): void {
    if (this.controlKeys.indexOf(event.key) < 0) {
      return;
    }
    const currentState = this.control$.getValue();
    switch(event.key) { 
      case 'w': { 
        currentState.UP = type === 'keydown';
        break; 
      } 
      case 's': { 
        currentState.DOWN = type === 'keydown';
        break; 
      }
      case 'd': { 
        currentState.RIGHT = type === 'keydown';
        break; 
      }
      case 'a': { 
        currentState.LEFT = type === 'keydown';
        break; 
      }
    }
    this.control$.next(currentState);
  }


  private startGame(): void {
    this.drawWater();
    this.drawPlayerCharacter();
    this.drawBorders()
    window.requestAnimationFrame(() => this.animate());
  }

  private drawWater(): void {
    this.drawBackground(0, 0, this.HEIGHT, this.WIDTH);
  }

  private drawBackground(x: number, y: number, height: number, width: number): void {
    this.ctx.beginPath();
    this.ctx.rect(x, y, height, width);
    this.ctx.fillStyle = Color.WATER;
    this.ctx.fill();
  }

  private drawCircle(location: XYLocation, color: Color): void {
    this.ctx.beginPath();
    this.ctx.arc(location.x, location.y, 20, 0, 2 * Math.PI);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  private movePlayerAndClean(): void {
    this.drawCircle(this.player.move(this.topLeftCorner, this.bottomRightCorner), Color.WATER);
  }

  private drawPlayerCharacter(): void {
    this.player.draw(this.ctx);
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
      this.movePlayerAndClean();
      this.drawBorders();
      this.drawPlayerCharacter();
      this.currentFrame = 0;
      window.requestAnimationFrame(() => this.animate());
    }
  }
}
