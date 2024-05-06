import { Component, ViewChild } from '@angular/core';
import { fromEvent, BehaviorSubject, distinct, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Border } from './classes/border';
import { Player } from './classes/player';
import { Color } from './utils/color';
import { ControlStatus } from './utils/control-status';
import { XYLocation } from './classes/xylocation';
import { Enemy } from './classes/enemy';
import { SpriteDrawingService } from './services/sprite-drawing.service';
import { DEBUG_MODE, MAX_ENEMIES, PIXEL_SIZE, SPRITE_SIZE, toggleDebugMode } from './utils/globals';
import { Fighter } from './classes/fighter';
import { EventsStreams } from './utils/events-streams';
import { DeathEvent } from './utils/death-event';
import { HitEvent } from './utils/hit-event';
import { TemporaryElement } from './classes/temporary-element';
import { TemporaryText } from './classes/temporary-text';

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
  private DEBUG = false;
  private domContext: CanvasRenderingContext2D = null as any;
  private delay = 0; // 120 is about 1 frame per second :)
  private currentFrame = 0;
  private player: Player = null as any;
  private enemiesCount: number = 0;
  private border: Border = null as any;
  private controlKeys = 'wasd';
  private control$: BehaviorSubject<ControlStatus>;
  private playerLocation$: BehaviorSubject<XYLocation>;
  private topLeftCorner: XYLocation = new XYLocation(-this.HEIGHT, -this.WIDTH);
  private bottomRightCorner: XYLocation = new XYLocation(this.HEIGHT, this.WIDTH);
  private innitialPlayerLocation = {x: 0, y: 0};
  private requireTranslation: XYLocation = new XYLocation(0,0);
  private lastEnemySpawnTime = 0;
  private enemySpawnDelay = 2000;
  private events$: EventsStreams;
  private playerId: string;
  private hitAreas: Map<string, Map<string, Enemy>> = new Map<string, Map<string, Enemy>>();
  private temporaryTexts: TemporaryText[] = [];
  private score = 0;

  constructor (private spriteDrawing: SpriteDrawingService) {
    this.events$ =  {
      death: new Subject<DeathEvent>(),
      hit: new Subject<HitEvent>()
    }

    this.control$ = new BehaviorSubject<ControlStatus>({UP: false, DOWN: false, LEFT: false, RIGHT: false});
    this.playerLocation$ = new BehaviorSubject<XYLocation>(this.innitialPlayerLocation);
    this.playerId = this.randomId();
    this.player = new Player(this.innitialPlayerLocation, new Fighter(), this.playerId, this.events$);
    
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
    this.enemyCanvas.nativeElement.width = PIXEL_SIZE * SPRITE_SIZE;
    this.enemyCanvas.nativeElement.height = PIXEL_SIZE * SPRITE_SIZE;
    this.heroCanvas.nativeElement.width =  PIXEL_SIZE * SPRITE_SIZE;
    this.heroCanvas.nativeElement.height = PIXEL_SIZE * SPRITE_SIZE;
    this.debugCanvas.nativeElement.width =  14 * SPRITE_SIZE;
    this.debugCanvas.nativeElement.height = 14 * SPRITE_SIZE;

    this.domContext = this.canvas.nativeElement.getContext("2d");
    this.domContext.translate(this.HEIGHT / 2, this.WIDTH / 2);
    this.startGame();
  }

  toggleDebug(): void {
    toggleDebugMode();
    window.requestAnimationFrame(() => this.animate());
  }

  private drawSpritePlayer(): void {
    const fighter = this.player.getFighter();
    this.spriteDrawing.draw(this.heroCanvas.nativeElement.getContext("2d"), fighter);
    this.spriteDrawing.writeFrame(this.debugCanvas.nativeElement.getContext("2d"), fighter.getSprite().frames[0], 0);
  }

  private drawSpriteEnemy(): void {
    const fighter = new Fighter();
    this.spriteDrawing.draw(this.enemyCanvas.nativeElement.getContext("2d"), fighter);
  }

  private handleInput(event: any, type: string): void {
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
    this.listenToEvents();
    window.requestAnimationFrame(() => this.animate());
  }

  private listenToEvents(): void {
    this.events$.death.subscribe((death: DeathEvent) => this.handleEnemyDeath(death));
    this.events$.hit.subscribe((hit: HitEvent) => this.handleEnemyHit(hit));
  }

  private handleEnemyDeath(death: DeathEvent): void {
    if (death.id === this.playerId) {
      console.log("You can't die like this...");
      return;
    }
    this.deleteFromHitArea(death.id);
    this.enemiesCount--;
    const playerLocation = this.playerLocation$.getValue();
    const textLocation = {x: playerLocation.x, y: playerLocation.y - SPRITE_SIZE};
    this.score++;
    this.temporaryTexts.push(new TemporaryText(5000, textLocation, this.score.toString(), "bold 16px Arial ", "red"));
  }

  private handleEnemyHit(hit: HitEvent): void {
    this.temporaryTexts.push(new TemporaryText(2000, hit.location, hit.text, "bold 16px Arial ", "white"));
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
    this.flatHitArea()
      .forEach(enemy => enemy
        .draw(this.domContext, this.enemyCanvas.nativeElement));
  }

  private drawTemporaryElement(): void {
    this.temporaryTexts = this.temporaryTexts.filter(text => !text.expired());
    this.spriteDrawing.drawTexts(this.domContext, this.temporaryTexts);
  }

  private moveEnemies(): void {
    this.flatHitArea().forEach(enemy => {
      enemy.move(this.topLeftCorner, this.bottomRightCorner);
      this.asignToHitArea(enemy);
    });
  }

  private flatHitArea(): Enemy[] {
    const enemies: Enemy[] = [];
    this.hitAreas.forEach(map => map.forEach(enemy => enemies.push(enemy)));
    return enemies;
  }

  private playerAttack(): void {
    const fighter = this.player.getFighter();
    fighter.attack(this.hitAreas, this.player.getAbsolutePositon());
    this.spriteDrawing.drawBoxes(this.domContext, fighter.getAdjustedAttackBox(), "green");
    this.spriteDrawing.drawBoxes(this.domContext, fighter.getAdjustedHitBoxes(), "blue");
  }

  private spawnEnemy(): void {
    if (Date.now() - this.lastEnemySpawnTime < this.enemySpawnDelay || this.enemiesCount > MAX_ENEMIES) {
      return;
    }
    this.lastEnemySpawnTime = Date.now();
    const enemyLocation = this.randomLocation();
    // const enemyLocation = {x: 50, y: 0};
    const enemyId = this.randomId();

    const enemy = new Enemy(
      enemyLocation, 
      this.playerLocation$.asObservable(), 
      new Fighter(), 
      enemyId, 
      this.events$);
    this.enemiesCount++;
    this.asignToHitArea(enemy);
  }

  private randomLocation(): XYLocation {
    const playerLocation = this.playerLocation$.getValue();
    const modifier1 = this.getRandomInt(2) === 0? -1 : 1;
    const modifier2 = this.getRandomInt(2) === 0? -1 : 1;
    return {x: playerLocation.x - this.HEIGHT / 2 * modifier1, y: playerLocation.y - this.HEIGHT / 2 * modifier2};
  }

  private randomId(): string {
    return this.lastEnemySpawnTime + "-" + this.getRandomInt(100);
  }

  private asignToHitArea(enemy: Enemy): void {
    const enemyId = enemy.getId();
    const areaNewId = this.areaId(enemy.getAbsolutePositon())
    const areaOldId = this.areaId(enemy.getOldPositon());
    if (areaNewId == areaOldId && this.hitAreas.size > 0) {
      return;
    }
    // Clean old
    this.deleteFromHitArea(enemyId);

    // Adjust new 
    if (!this.hitAreas.has(areaNewId)) {
      this.hitAreas.set(areaNewId, new Map<string, Enemy>());
    }
    const areaMap = this.hitAreas.get(areaNewId);
    areaMap?.set(enemyId, enemy);
  }

  private deleteFromHitArea(enemyId: string): void {
    let emptyMapsIds: string[] = [];
    this.hitAreas.forEach((value: Map<string, Enemy>, key: string) => {
      const deleted = value.delete(enemyId);
      if (value.size === 0) {
        emptyMapsIds.push(key);
      }
    });
    emptyMapsIds.forEach(key => this.hitAreas.delete(key));
  }

  private areaId(location: XYLocation): string {
    return Math.floor(location.x / 50) + "-" + Math.floor(location.y / 50);
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

      this.drawTemporaryElement();

      this.currentFrame = 0;
      if (!DEBUG_MODE) {
        window.requestAnimationFrame(() => this.animate());
      }
    }
  }
}
