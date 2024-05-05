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
import { DEBUG_MODE, PIXEL_HEIGHT, SPRITE_SIZE, toggleDebugMode } from './utils/globals';
import { Fighter } from './classes/fighter';

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
  @ViewChild('debug') debugCanvas: any = null;
  private WIDTH = 500;
  private HEIGHT = 500;
  private DEBUG = true;
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
  private lastEnemySpawnTime = 0;
  private enemySpawnDelay = 2000;
  private hitAreas: Map<string, Map<string, Enemy>> = new Map<string, Map<string, Enemy>>();

  constructor (private spriteDrawing: SpriteDrawingService) {
    this.control$ = new BehaviorSubject<ControlStatus>({UP: false, DOWN: false, LEFT: false, RIGHT: false});
    this.playerLocation$ = new BehaviorSubject<XYLocation>(this.innitialPlayerLocation);
    this.player = new Player(this.innitialPlayerLocation, new Fighter());
    
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
    this.enemyCanvas.nativeElement.width = PIXEL_HEIGHT * SPRITE_SIZE;
    this.enemyCanvas.nativeElement.height = PIXEL_HEIGHT * SPRITE_SIZE;
    this.heroCanvas.nativeElement.width =  PIXEL_HEIGHT * SPRITE_SIZE;
    this.heroCanvas.nativeElement.height = PIXEL_HEIGHT * SPRITE_SIZE;
    this.debugCanvas.nativeElement.width =  14 * SPRITE_SIZE;
    this.debugCanvas.nativeElement.height = 14 * SPRITE_SIZE;

    this.domContext = this.canvas.nativeElement.getContext("2d");
    this.startGame();
  }

  toggleDebug(): void {
    toggleDebugMode();
    window.requestAnimationFrame(() => this.animate());
  }

  drawSpritePlayer(): void {
    const fighter = this.player.getFighter();
    this.spriteDrawing.draw(this.heroCanvas.nativeElement.getContext("2d"), fighter);
    this.spriteDrawing.writeFrame(this.debugCanvas.nativeElement.getContext("2d"), fighter.getSprite().frames[0], 0);
  }

  drawSpriteEnemy(): void {
    // if (this.enemies.length <= 0) {
    //   return;
    // }
    const fighter = new Fighter();
    this.spriteDrawing.draw(this.enemyCanvas.nativeElement.getContext("2d"), fighter);
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
    this.adjustHitAreas();
  }

  private playerAttack(): void {
    const fighter = this.player.getFighter();
    fighter.attack();
  }

  private spawnEnemy(): void {
    if (Date.now() - this.lastEnemySpawnTime < this.enemySpawnDelay || this.enemies.length > 1) {
      return;
    }
    this.lastEnemySpawnTime = Date.now();

    const playerLocation = this.playerLocation$.getValue();
    const modifier1 = this.getRandomInt(2) === 0? -1 : 1;
    const modifier2 = this.getRandomInt(2) === 0? -1 : 1;
    const enemyLocation = {x: playerLocation.x - this.HEIGHT / 2 * modifier1, y: playerLocation.y - this.HEIGHT / 2 * modifier2};
    const enemyId = this.lastEnemySpawnTime + "-" + this.getRandomInt(100);

    const enemy = new Enemy(
      enemyLocation, 
      this.playerLocation$.asObservable(), 
      new Fighter(), 
      enemyId);
    this.enemies.push(enemy);
  }

  private adjustHitAreas(): void {
    this.enemies.forEach((enemy: Enemy) => {
      const enemyId = enemy.getId();
      const enemyLocation = enemy.getAbsolutePositon();
      const enemyOldLocation = enemy.getOldPositon();
      const areaNewId = Math.floor(enemyLocation.x / 50) + "-" + Math.floor(enemyLocation.y / 50);
      const areaOldId = Math.floor(enemyOldLocation.x / 50) + "-" + Math.floor(enemyOldLocation.y / 50);
      console.log(areaNewId);
      console.log(areaOldId);
      if (areaNewId == areaOldId && this.hitAreas.size > 0) {
        return;
      }
      console.log("changed")
      // Clean old
      if (this.hitAreas.has(areaOldId)) {
        const hitArea = this.hitAreas.get(areaOldId);
        hitArea?.delete(enemyId);
        if (hitArea?.size == 0) {
          this.hitAreas.delete(areaOldId);
        }
      }
  
      // Adjust new 
      if (!this.hitAreas.has(areaNewId)) {
        this.hitAreas.set(areaNewId, new Map<string, Enemy>());
      }
      const areaMap = this.hitAreas.get(areaNewId);
      areaMap?.set(enemyId, enemy);
    });
    console.log(this.hitAreas.size);
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  private animate(): void {
    if (this.currentFrame < this.delay) {
      this.currentFrame++;
      window.requestAnimationFrame(() => this.animate());
    } else {
      this.spawnEnemy();

      this.movePlayer();
      this.moveEnemies();

      this.drawBackground();
      this.drawBorders();
      this.drawEnemies();
      this.drawPlayer();

      this.playerAttack();

      this.currentFrame = 0;
      if (!DEBUG_MODE) {
        window.requestAnimationFrame(() => this.animate());
      }
    }
  }
}
