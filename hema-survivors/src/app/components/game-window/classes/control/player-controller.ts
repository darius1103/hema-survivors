import { Observable } from "rxjs";
import { ControlStatus } from "../../utils/control-status";
import { AttackCommand } from "../common/attack-command";
import { CharacterControlConfig } from "../common/character-control-config";
import { CharacterMovementConfig } from "../common/character-movement-config";
import { DrawCommand } from "../common/draw-command";
import { XY } from "../common/x-y";
import { AttackPlayer } from "./attack-player";
import { MovementPlayer } from "./movement-player";
import { CharacterDisplay } from "../display/characters/character-display";
import { drawHealthBar, drawStT } from "../display/sprite-draw";
import { Box } from "../common/box";
import { AttackEvent } from "../../utils/attack-event";
import { SPRITE_HELPER } from "../../utils/globals";
import { HealthBarDrawCommand } from "../common/health-bar-draw-command copy";

export class PlayerController {
    private id: string;
    private controlConfig: CharacterControlConfig;
    private movementConfig: CharacterMovementConfig;
    private attackController: AttackPlayer;
    private movementController: MovementPlayer;

    constructor(id: string, controlConfig: CharacterControlConfig, movementConfig: CharacterMovementConfig) {
        this.id = id;
        this.controlConfig = controlConfig;
        this.movementConfig = movementConfig;
        const width = this.controlConfig.combinedData?.getSprite().getWidth();
        const height = this.controlConfig.combinedData?.getSprite().getHeight();
        this.movementConfig.width = width;
        this.movementConfig.height = height;
        this.attackController = new AttackPlayer();
        this.movementController = new MovementPlayer(movementConfig);
    }

    public getId(): string {
        return this.id;
    }

    public control(stream: Observable<ControlStatus>): void {
        stream.subscribe((status) => this.movementConfig.controlStatus = status);
    }

    public move(p1: any, p2: any): XY {
        return this.movementController.move(p1, p2);
    }

    public attack(hitAreas: any): void {
        this.controlConfig.attack.weapons.forEach(weapon => {
            const command: AttackCommand = {
                hitAreas, weapon, 
                ownLocation: this.movementConfig.absolutePosition, 
                ltr: this.movementConfig.ltr,
                damageRangeMin: this.controlConfig.attack.damageRangeMin,
                damageRangeMax: this.controlConfig.attack.damageRangeMax
            };
            this.attackController.attack(command);
        })
    }

    public attemptAttack(attack: AttackEvent): void {
        const hitBoxes = SPRITE_HELPER.centerBoxesH(this.getHitBoxes());
        const gotHit = this.attackController.attemptAttack(
            attack, 
            hitBoxes, 
            this.movementConfig.absolutePosition,
            this.controlConfig.health.hitBoxes$);
        if (gotHit) {
            console.log("You, enemy, hurt me for " + attack.damage + " , auch!");
            this.controlConfig.events$.hit.next({
                text: attack.damage.toString(),
                location: this.movementConfig.absolutePosition});
            this.controlConfig.health.currentHealth -= attack.damage;
            if (this.controlConfig.health.currentHealth <= 0) {
                this.controlConfig.events$.death.next({
                    id: this.id});
            }
        } else {
            console.log("Missed me, enemy!");
        }
    }

    public getCharacterDisplay(): CharacterDisplay {
        return this.controlConfig?.combinedData;
    }

    public draw(targetCtx: CanvasRenderingContext2D, sourceCtxRTL: HTMLCanvasElement, sourceCtxLTR: HTMLCanvasElement): void {
        const sourceCtx = this.movementController.ltr() ? sourceCtxRTL : sourceCtxLTR;
        const position = this.movementConfig.absolutePosition;
        const drawCommand: DrawCommand = {
            targetCtx,
            sourceCtx,
            position,
        }
        drawStT(drawCommand);
        if (this.controlConfig?.health?.healthBar && this.controlConfig.health.currentHealth) {
            const command: HealthBarDrawCommand = {
                ctx: targetCtx,
                config: this.controlConfig?.health?.healthBar,
                location: this.movementConfig.absolutePosition,
                percentage: this.controlConfig.health.currentHealth / this.controlConfig.health.maximumHealth,
            }
            drawHealthBar(command);
        }
    }

    public getAdjustedAttackBoxes(): Box[] {
        let boxes: Box[] = [];
        this.controlConfig.attack.weapons.forEach(weapon => boxes = boxes.concat(weapon.adjustedAttackBoxes));
        return boxes;
    }

    private getHitBoxes(): Box[] {
        return this.controlConfig.combinedData
            .getSprite()
            .getCombinedData(
                this.movementConfig.ltr, 
                this.controlConfig.combinedData.getConfig()).boxes;
    }
}