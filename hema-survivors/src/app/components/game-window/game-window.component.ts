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
import { DEBUG_MODE, PIXEL_HEIGHT, toggleDebugMode } from './utils/globals';
import { FRAME_ONE } from './utils/sprite-data';

@Component({
  selector: 'app-game-window',
  standalone: true,
  templateUrl: './game-window.component.html',
  styleUrl: './game-window.component.scss'
})
export class GameWindowComponent {
  @ViewChild('canvas') canvas: any = null;
  @ViewChild('heroCanvas') heroCanvas: any = null;
  @ViewChild('enemyCanvas') enemyCanvas: any = null;
  private WIDTH = 500;
  private HEIGHT = 500;
  private DEBUG = false;
  private domContext: CanvasRenderingContext2D = null as any;
  private delay = 0; // 120 is about 1 frame per second :)
  private currentFrame = 0;
  private player: Player = null as any;
  private enemies: Enemy[] = [];
  private border: Border = null as any;
  private controlKeys = 'wasd';
  private control$: BehaviorSubject<ControlStatus>;
  private playerLocation$: BehaviorSubject<XYLocation>;
  private topLeftCorner: XYLocation = new XYLocation(-this.HEIGHT, -this.WIDTH);
  private bottomRightCorner: XYLocation = new XYLocation(this.HEIGHT, this.WIDTH);
  private innitialPlayerLocation = {x: this.HEIGHT/2, y: this.WIDTH/2};
  private requireTranslation: XYLocation = new XYLocation(0,0);

  constructor (private spriteDrawing: SpriteDrawingService) {
    this.control$ = new BehaviorSubject<ControlStatus>({UP: false, DOWN: false, LEFT: false, RIGHT: false});
    this.playerLocation$ = new BehaviorSubject<XYLocation>(this.innitialPlayerLocation);
    this.player = new Player(this.innitialPlayerLocation);
    const playerObs = this.playerLocation$.asObservable();
    
    this.enemies.push(new Enemy({x: this.HEIGHT/4, y: this.WIDTH/4}, playerObs));
    this.enemies.push(new Enemy({x: this.HEIGHT/4*3, y: this.WIDTH/4}, playerObs));
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
        console.log('null canvases...')
        return;
    }

    this.canvas.nativeElement.width = this.WIDTH;
    this.canvas.nativeElement.height = this.HEIGHT;
    this.enemyCanvas.nativeElement.width = PIXEL_HEIGHT * FRAME_ONE[0].length * 2;
    this.enemyCanvas.nativeElement.height = PIXEL_HEIGHT * FRAME_ONE.length;
    this.heroCanvas.nativeElement.width =  PIXEL_HEIGHT * FRAME_ONE[0].length * 2;
    this.heroCanvas.nativeElement.height = PIXEL_HEIGHT * FRAME_ONE.length;;

    this.domContext = this.canvas.nativeElement.getContext("2d");
    this.startGame();
  }

  toggleDebug(): void {
    toggleDebugMode();
    window.requestAnimationFrame(() => this.animate());
  }

  drawSpritePlayer(): void {
    this.spriteDrawing.draw(this.heroCanvas.nativeElement.getContext("2d"), this.player.getSprite());
  }

  drawSpriteEnemy(): void {
    if (this.enemies.length <= 0) {
      return;
    }
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
    if (DEBUG_MODE) {
      window.requestAnimationFrame(() => this.animate());
    }
  }

  private startGame(): void {
    this.drawSpritePlayer();
    this.drawSpriteEnemy();
    this.drawBackground();
    this.drawPlayer();
    this.drawBorders();
    window.requestAnimationFrame(() => this.animate());
  }

  private drawBackground(): void {
    this.domContext.beginPath();
    this.domContext.rect(
      -(this.HEIGHT * 2), -(this.WIDTH * 2), 
      (this.HEIGHT * 4), (this.WIDTH * 4));
    this.domContext.fillStyle = Color.BLUE;
    this.domContext.fill();
  }

  private movePlayer(): void {
    const playerLocation = this.player.move(this.topLeftCorner, this.bottomRightCorner);
    this.requireTranslation = new XYLocation(
      playerLocation.x - this.playerLocation$.getValue().x,
      playerLocation.y - this.playerLocation$.getValue().y
    );
    this.domContext.translate(-this.requireTranslation.x, -this.requireTranslation.y);
    this.playerLocation$.next(new XYLocation(playerLocation.x, playerLocation.y));
  }

  private drawPlayer(): void {
    this.player.draw(this.domContext, this.heroCanvas.nativeElement);
  }

  private drawBorders(): void {
    this.border.draw(this.domContext);
  }

  private drawEnemies(): void {
    this.enemies.forEach(enemy => enemy.draw(this.domContext, this.enemyCanvas.nativeElement));
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
      this.movePlayer();
      this.moveEnemies();

      this.drawBackground();
      this.drawBorders();
      this.drawEnemies();
      this.drawPlayer();

      this.currentFrame = 0;
      if (!DEBUG_MODE) {
        window.requestAnimationFrame(() => this.animate());
      }
    }
  }
}
