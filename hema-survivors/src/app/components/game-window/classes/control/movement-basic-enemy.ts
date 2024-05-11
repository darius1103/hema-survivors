import { SPRITE_SIZE } from "../../utils/globals";
import { CharacterMovementConfig } from "../common/character-movement-config";
import { MoveCommand } from "../common/move-command";
import { XY } from "../common/x-y";
import { MovementController } from "./movement-controller";
import { moveWithinBorder } from "./movement-npc";

export class MovementBasicEnemy extends MovementController {
    private config: CharacterMovementConfig;

    constructor(config: CharacterMovementConfig) {
        super();
        this.config = config;
    }

    public override move(p1: XY, p2: XY): XY {
        const playerLocation = this.config.playerLocation$.getValue();
        const ownPosition = this.config.absolutePosition;
        const spacing = SPRITE_SIZE;
        if (this.distance(ownPosition, playerLocation) < spacing) {
            return this.config.oldAbsolutePosition;
        }
        this.determineStatus(ownPosition, playerLocation);
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

    public distanceFromPlayer(): number {
        const playerLocation = this.config.playerLocation$.getValue();
        const ownPosition = this.config.absolutePosition;
        return this.distance(ownPosition, playerLocation);
    }

    private determineStatus(own: XY, player: XY): void {
        const padding = 10;
        this.config.controlStatus.DOWN = player.y > own.y - padding;
        this.config.controlStatus.UP = player.y < own.y + padding;
        this.config.controlStatus.LEFT = player.x < own.x + padding;
        this.config.controlStatus.RIGHT = player.x > own.x - padding;
    }

    private distance(own: XY, player: XY): number {
        var xDiff = own.x - player.x; 
        var yDiff = own.y - player.y;
        return Math.sqrt(xDiff * xDiff + yDiff * yDiff)
    }
}