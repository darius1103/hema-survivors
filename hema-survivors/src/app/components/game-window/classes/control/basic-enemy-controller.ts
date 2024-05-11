import { Box } from "../common/box";
import { CharacterControlConfig } from "../common/character-control-config";
import { CharacterMovementConfig } from "../common/character-movement-config";
import { AttackBasicEnemy } from "./attack-basic-enemy";
import { AttackController } from "./attack-controller";
import { MovementBasicEnemy } from "./movement-basic-enemy";
import { MovementController } from "./movement-controller";
import { EnemyController } from "./enemy-controller";
import { DrawCommand } from "../common/draw-commabd";
import { drawStT } from "../display/sprite-draw";
import { XY } from "../common/x-y";

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
        const width = this.controlConfig.combinedDataLTR?.getSprite().getWidth();
        const height = this.controlConfig.combinedDataLTR?.getSprite().getHeight();
        this.movementConfig.width = width;
        this.movementConfig.height = height;
        this.attackController = new AttackBasicEnemy();
        this.movementController = new MovementBasicEnemy(movementConfig);
    }

    public attemptAttack(attackBoxes: Box[], damage: number): void {
        console.log("You hurt me for " + damage + " , auch!");
        console.log(attackBoxes);
        // const gotHit = this.figther.attemptAttack(attackBoxes, damage, this.absolutePosition, this.facingRight);
        // if (gotHit) {
        //     this.events$.hit.next({
        //         text: damage.toString(),
        //         unit: this.figther,
        //         location: this.getAbsolutePositon()});
        //     this.currentHealth -= damage;
        //     if (this.currentHealth <= 0) {
        //         this.events$.death.next({
        //             id: this.id, 
        //             unit: this.figther});
        //     }
        // }
    }

    public override getId(): string {
        return this.id;
    }

    public override move(p1: any, p2: any): XY {
        return this.movementController.move(p1, p2);
    }

    public override getAbsolutePositon(): XY {
        return this.movementConfig.absolutePosition;
    }

    public override getOldPositon(): XY {
        return this.movementConfig.oldAbsolutePosition;
    } 

    public override draw(targetCtx: CanvasRenderingContext2D, sourceCtxRTL: HTMLCanvasElement, sourceCtxLTR: HTMLCanvasElement): void {
        const sourceCtx = this.movementController.rtl() ? sourceCtxRTL : sourceCtxLTR;
        const position = this.movementConfig.absolutePosition;
        const drawCommand: DrawCommand = {
            targetCtx,
            sourceCtx,
            position,
        }
        drawStT(drawCommand);
    }
}