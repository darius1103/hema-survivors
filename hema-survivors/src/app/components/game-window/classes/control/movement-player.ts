import { CharacterMovementConfig } from "../common/character-movement-config";
import { MoveCommand } from "../common/move-command";
import { XY } from "../common/x-y";
import { moveWithinBorder } from "./movement-npc";

export class MovementPlayer {
    private config: CharacterMovementConfig;

    constructor(config: CharacterMovementConfig) {
        this.config = config;
        config.control$.subscribe(status => this.config.controlStatus = status);
    }

    public move(p1: any, p2: any): XY {
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
        this.config.facingRight = commandResult.facingRight;
        this.config.oldAbsolutePosition = commandResult.oldPosition;
        return this.config.oldAbsolutePosition;
    }
}