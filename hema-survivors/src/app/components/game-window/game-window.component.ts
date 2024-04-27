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
  domContext: CanvasRenderingContext2D = null as any;
  playerCanvas: HTMLCanvasElement = null as any;
  playerCtx: CanvasRenderingContext2D = null as any;
  enemiesCanvas: HTMLCanvasElement = null as any;
  enemiesCtx: CanvasRenderingContext2D = null as any;
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

    this.domContext = this.canvas.nativeElement.getContext("2d");

    this.playerCanvas = document.createElement('canvas');
    this.playerCanvas.width = this.WIDTH;
    this.playerCanvas.height = this.HEIGHT;
    this.playerCtx = this.playerCanvas.getContext('2d') as any;
    this.enemiesCanvas = document.createElement('canvas');
    this.enemiesCanvas.width = this.WIDTH;
    this.enemiesCanvas.height = this.HEIGHT;
    this.enemiesCtx = this.playerCanvas.getContext('2d') as any;

    this.drawSpritePlayer();
    this.drawSpriteEnemy();

    this.startGame();
  }

  drawSpritePlayer(): void {
    this.spriteDrawing.draw(this.heroCanvas.nativeElement.getContext("2d"), this.player.getSprite());
  }

  drawSpriteEnemy(): void {
    this.spriteDrawing.draw(this.enemyCanvas.nativeElement.getContext("2d"), this.enemies[0].getSprite());
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
    this.drawPlayer();
    this.drawBorders()
    window.requestAnimationFrame(() => this.animate());
  }

  private drawWater(): void {
    this.drawBackground(0, 0, this.HEIGHT, this.WIDTH);
  }

  private drawBackground(x: number, y: number, height: number, width: number): void {
    this.domContext.beginPath();
    this.domContext.rect(x, y, height, width);
    this.domContext.fillStyle = Color.BLUE;
    this.domContext.fill();
  }

  private movePlayer(): void {
    const playerLocation = this.player.move(this.topLeftCorner, this.bottomRightCorner)
    this.playerLocation$.next(playerLocation);
  }

  private drawPlayer(): void {
    this.playerCtx.clearRect(0, 0, 999, 999);
    this.player.draw(this.playerCtx, this.heroCanvas.nativeElement);
    this.domContext.drawImage(this.playerCanvas, 0, 0);
  }

  private drawBorders(): void {
    this.border.draw(this.domContext);
  }

  private drawEnemies(): void {
    this.enemiesCtx.clearRect(0, 0, 999, 999);
    this.enemies.forEach(enemy => enemy.draw(this.domContext, this.enemyCanvas.nativeElement));
    this.domContext.drawImage(this.enemiesCanvas, 0, 0);
  }

  private moveEnemies(): void {
    this.enemies.forEach((enemy)=> {
      enemy.move(this.topLeftCorner, this.bottomRightCorner);
    });
  }

  private animate(): void {
    if (this.currentFrame < this.delay) {
      this.currentFrame++;
      window.requestAnimationFrame(() => this.animate());
    } else {
      this.domContext.clearRect(0, 0, 999, 999);
      this.movePlayer();
      this.moveEnemies();

      this.drawWater();
      this.drawBorders();
      this.drawEnemies();
      this.drawPlayer();

      this.currentFrame = 0;
      window.requestAnimationFrame(() => this.animate());
    }
  }
}
