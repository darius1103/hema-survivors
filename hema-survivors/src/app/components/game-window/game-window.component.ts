import { Component, ViewChild } from '@angular/core';
import { fromEvent, BehaviorSubject, distinct } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Border } from './classes/border';
import { Player } from './classes/player';
import { Color } from './utils/color';
import { ControlStatus } from './utils/control-status';
import { XYLocation } from './classes/xylocation';
import { Enemy } from './classes/enemy';
import { SpriteDrawingService } from './services/sprite-drawing.service';

@Component({
  selector: 'app-game-window',
  standalone: true,
  imports: [],
  templateUrl: './game-window.component.html',
  styleUrl: './game-window.component.scss'
})
export class GameWindowComponent {
  @ViewChild('canvas') canvas: any = null;
  @ViewChild('heroCanvas') heroCanvas: any = null;
  @ViewChild('enemyCanvas') enemyCanvas: any = null;
  WIDTH = 500;
  HEIGHT = 500;
  ctx: CanvasRenderingContext2D = null as any;
  heroCtx: CanvasRenderingContext2D = null as any;
  enemyCtx: CanvasRenderingContext2D = null as any;
  delay = 0; // 120 is about 1 frame per second :)
  currentFrame = 0;
  player: Player = null as any;
  enemies: Enemy[] = [];
  border: Border = null as any;
  controlKeys = 'wasd';
  control$: BehaviorSubject<ControlStatus>;
  playerLocation$: BehaviorSubject<XYLocation>;
  topLeftCorner: XYLocation = new XYLocation(25, 25);
  bottomRightCorner: XYLocation = new XYLocation(375, 475);

  constructor (private spriteDrawing: SpriteDrawingService) {
    this.control$ = new BehaviorSubject<ControlStatus>({UP: false, DOWN: false, LEFT: false, RIGHT: false});
    const innitialPlayerLocation = {x: this.HEIGHT/2, y: this.WIDTH/2};
    this.playerLocation$ = new BehaviorSubject<XYLocation>(innitialPlayerLocation);
    this.player = new Player(innitialPlayerLocation);
    const playerObs = this.playerLocation$.asObservable();
    

    this.enemies.push(new Enemy({x: this.HEIGHT/4, y: this.WIDTH/4}, playerObs));
    this.enemies.push(new Enemy({x: 123, y: 123}, playerObs));
    this.enemies.push(new Enemy({x: 232, y: this.WIDTH/4}, playerObs));
    this.enemies.push(new Enemy({x: 443, y: 100}, playerObs));
    this.enemies.push(new Enemy({x: 222, y: this.WIDTH/4}, playerObs));
    this.enemies.push(new Enemy({x: 34, y: 99}, playerObs));
    
    this.player.control(this.control$.asObservable());
    this.border = new Border(this.topLeftCorner, this.bottomRightCorner);
    fromEvent(document, 'keydown')
      .pipe(takeUntilDestroyed(), distinct())
      .subscribe(event => this.handleInput(event, 'keydown'));
    fromEvent(document, 'keyup')
      .pipe(takeUntilDestroyed(), distinct())
      .subscribe(event => this.handleInput(event, 'keyup'));
  }

  ngAfterViewInit() {
    if (this.canvas == null || this.heroCanvas == null || this.enemyCanvas == null) {
        console.log('null canvas...')
        return;
    }

    this.canvas.nativeElement.width = this.WIDTH;
    this.canvas.nativeElement.height = this.HEIGHT;
    this.enemyCanvas.nativeElement.width = 100;
    this.enemyCanvas.nativeElement.height = 100;
    this.heroCanvas.nativeElement.width = 100;
    this.heroCanvas.nativeElement.height = 100;
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.heroCtx = this.heroCanvas.nativeElement.getContext("2d");
    this.enemyCtx = this.enemyCanvas.nativeElement.getContext("2d");

    this.drawPlayer();
    this.drawEnemy();
    this.startGame();
  }

  drawPlayer(): void {
    this.spriteDrawing.draw(this.heroCtx, this.player.getSprite());
  }

  drawEnemy(): void {
    this.spriteDrawing.draw(this.enemyCtx, this.enemies[0].getSprite());
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
    this.ctx.fillStyle = Color.BLUE;
    this.ctx.fill();
  }

  private drawCircle(location: XYLocation, color: Color): void {
    this.ctx.beginPath();
    this.ctx.arc(location.x, location.y, 50, 0, 2 * Math.PI);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  private movePlayerAndClean(): void {
    const playerLocation = this.player.move(this.topLeftCorner, this.bottomRightCorner)
    this.playerLocation$.next(playerLocation);
    this.drawCircle(playerLocation, Color.BLUE);
  }

  private drawPlayerCharacter(): void {
    this.player.draw(this.ctx, this.heroCanvas.nativeElement);
  }

  private drawBorders(): void {
    this.border.draw(this.ctx);
  }

  private drawEnemies(): void {
    this.enemies.forEach(enemy => enemy.draw(this.ctx, this.enemyCanvas.nativeElement));
  }

  private moveEnemies(): void {
    this.enemies.forEach((enemy)=> {
      this.drawCircle(enemy.move(this.topLeftCorner, this.bottomRightCorner), Color.BLUE);
    });
  }

  private animate(): void {
    if (this.currentFrame < this.delay) {
      this.currentFrame++;
      window.requestAnimationFrame(() => this.animate());
    } else {
      this.movePlayerAndClean();
      this.moveEnemies();
      this.drawBorders();
      this.drawEnemies();
      this.drawPlayerCharacter();
      this.currentFrame = 0;
      window.requestAnimationFrame(() => this.animate());
    }
  }
}
