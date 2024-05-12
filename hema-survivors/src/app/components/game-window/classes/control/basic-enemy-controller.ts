import { Box } from "../common/box";
import { CharacterControlConfig } from "../common/character-control-config";
import { CharacterMovementConfig } from "../common/character-movement-config";
import { AttackBasicEnemy } from "./attack-basic-enemy";
import { MovementBasicEnemy } from "./movement-basic-enemy";
import { EnemyController } from "./enemy-controller";
import { DrawCommand } from "../common/draw-command";
import { drawStT } from "../display/sprite-draw";
import { XY } from "../common/x-y";
import { SPRITE_HELPER } from "../../utils/globals";

export class BasicEnemyController extends EnemyController  {
    private id: string;
    private controlConfig: CharacterControlConfig;
    private movementConfig: CharacterMovementConfig;
    private attackController: AttackBasicEnemy;
    private movementController: MovementBasicEnemy;

    constructor(id: string, controlConfig: CharacterControlConfig, movementConfig: CharacterMovementConfig) {
        super();
        this.id = id;
        this.controlConfig = controlConfig;
        this.movementConfig = movementConfig;
        const width = this.controlConfig.combinedData?.getSprite().getWidth();
        const height = this.controlConfig.combinedData?.getSprite().getHeight();
        this.movementConfig.width = width;
        this.movementConfig.height = height;
        this.attackController = new AttackBasicEnemy();
        this.movementController = new MovementBasicEnemy(movementConfig);
    }

    public attemptAttack(attackBoxes: Box[], damage: number): void {
        const hitBoxes = SPRITE_HELPER.centerBoxesH(this.getHitBoxes());
        const gotHit = this.attackController.attemptAttack(
            attackBoxes, 
            hitBoxes, 
            this.movementConfig.absolutePosition,
            this.controlConfig.health.hitBoxes$);
        if (gotHit) {
            console.log("You hurt me for " + damage + " , auch!");
            this.controlConfig.events$.hit.next({
                text: damage.toString(),
                location: this.getAbsolutePositon()});
            this.controlConfig.health.currentHealth -= damage;
            if (this.controlConfig.health.currentHealth <= 0) {
                this.controlConfig.events$.death.next({
                    id: this.id});
            }
        } else {
            console.log("Missed me!");
        }
    }

    private getHitBoxes(): Box[] {
        return this.controlConfig.combinedData
            .getSprite()
            .getCombinedData(
                this.movementConfig.ltr, 
                this.controlConfig.combinedData.getConfig()).boxes;
    }

    public override getId(): string {
        return this.id;
    }

    public override move(p1: any, p2: any): void {
        this.movementController.move(p1, p2);
        this.attackController.attack({
            id :this.id,
            config:this.controlConfig.attack, 
            location:this.movementConfig.absolutePosition, 
            distance:this.movementController.distanceFromPlayer(),
            attack$:this.controlConfig.events$.attack,
            ltr: this.movementController.ltr()
        });
    }

    public override getAbsolutePositon(): XY {
        return this.movementConfig.absolutePosition;
    }

    public override getOldPositon(): XY {
        return this.movementConfig.oldAbsolutePosition;
    } 

    public override draw(targetCtx: CanvasRenderingContext2D, sourceCtxRTL: HTMLCanvasElement, sourceCtxLTR: HTMLCanvasElement): void {
        const sourceCtx = this.movementController.ltr() ? sourceCtxRTL : sourceCtxLTR;
        const position = this.movementConfig.absolutePosition;
        const drawCommand: DrawCommand = {
            targetCtx,
            sourceCtx,
            position,
        }
        drawStT(drawCommand);
    }
}