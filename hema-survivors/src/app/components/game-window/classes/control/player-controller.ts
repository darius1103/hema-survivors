import { Observable } from "rxjs";
import { ControlStatus } from "../../utils/control-status";
import { AttackCommand } from "../common/attack-command";
import { CharacterControlConfig } from "../common/character-control-config";
import { CharacterMovementConfig } from "../common/character-movement-config";
import { DrawCommand } from "../common/draw-commabd";
import { XY } from "../common/x-y";
import { AttackPlayer } from "./attack-player";
import { MovementPlayer } from "./movement-player";
import { CharacterDisplay } from "../display/characters/character-display";
import { drawStT } from "../display/sprite-draw";

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
        const width = this.controlConfig.combinedDataLTR?.getSprite().getWidth();
        const height = this.controlConfig.combinedDataLTR?.getSprite().getHeight();
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

    public getCharacterDisplay(rlt: boolean): CharacterDisplay {
        return (rlt ? this.controlConfig?.combinedDataLTR: this.controlConfig?.combinedDataRTL) as any;
    }

    public draw(targetCtx: CanvasRenderingContext2D, sourceCtxRTL: HTMLCanvasElement, sourceCtxLTR: HTMLCanvasElement): void {
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