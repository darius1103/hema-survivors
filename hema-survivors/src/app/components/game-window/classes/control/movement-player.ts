import { CharacterMovementConfig } from "../common/character-movement-config";
import { MoveCommand } from "../common/move-command";
import { XY } from "../common/x-y";
import { MovementController } from "./movement-controller";
import { moveWithinBorder } from "./movement-npc";

export class MovementPlayer extends MovementController {
    private config: CharacterMovementConfig;

    constructor(config: CharacterMovementConfig) {
        super();
        this.config = config;
        config.control$.subscribe(status => this.config.controlStatus = status);
    }

    public override move(p1: XY, p2: XY): XY {
        const moveCommand: MoveCommand = {
            borderP1: p1,
            borderP2: p2,
            speed: this.config.speed,
            width: this.config.width,
            height: this.config.height,
            controlStatus: this.config.controlStatus,
            currentPosition: this.config.absolutePosition
        };
        const commandResult = moveWithinBorder(moveCommand);
        this.config.absolutePosition = commandResult.newPosition;
        this.config.ltr = commandResult.newPosition.x === commandResult.oldPosition.x ?
            this.config.ltr: commandResult.newPosition.x > commandResult.oldPosition.x ;
        this.config.oldAbsolutePosition = commandResult.oldPosition;
        return this.config.oldAbsolutePosition;
    }

    public override ltr(): boolean{
        return this.config.ltr;
    }
}