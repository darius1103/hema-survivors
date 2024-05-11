import { Observable } from "rxjs";
import { ControlStatus } from "../utils/control-status";
import { CharacterControlConfig } from "./common/character-control-config";
import { CharacterMovementConfig } from "./common/character-movement-config";
import { XY } from "./common/x-y";
import { AttackPlayer } from "./control/attack-player";
import { MovementPlayer } from "./control/movement-player";
import { CharacterDisplay } from "./display/characters/character-display";

export class PlayerControlled {
    private id: string;
    private controlConfig: CharacterControlConfig;
    private movementConfig: CharacterMovementConfig;
    private attackController: AttackPlayer;
    private movementController: MovementPlayer;

    constructor(id: string, controlConfig: CharacterControlConfig, movementConfig: CharacterMovementConfig) {
        this.id = id;
        this.controlConfig = controlConfig;
        this.movementConfig = movementConfig;
        this.attackController = new AttackPlayer(controlConfig);
        this.movementController = new MovementPlayer(movementConfig);
    }

    public control(stream: Observable<ControlStatus>): void {
        stream.subscribe((status) => this.movementConfig.controlStatus = status);
    }

    public move(p1: any, p2: any): XY {
        return this.movementController.move(p1, p2);
    }

    public getCharacterDisplay(rlt: boolean): CharacterDisplay {
        return (rlt ? this.controlConfig?.combinedDataLTR: this.controlConfig?.combinedDataLTR) as any;
    }

    public draw(targetCtx: CanvasRenderingContext2D, sourceCtxRTL: HTMLCanvasElement, sourceCtxLTR: HTMLCanvasElement): void {
        const sourceCtx = this.movementConfig.facingRight ? sourceCtxRTL : sourceCtxLTR;
        const x = Math.round(this.movementConfig.absolutePosition.x - sourceCtx.width/2);
        const y = Math.round(this.movementConfig.absolutePosition.y - sourceCtx.height/2);
        targetCtx.drawImage(sourceCtx, x, y, sourceCtx.width, sourceCtx.height);
        this.movementConfig.oldAbsolutePosition.x = this.movementConfig.absolutePosition.x;
        this.movementConfig.oldAbsolutePosition.y = this.movementConfig.absolutePosition.y;
    }
}