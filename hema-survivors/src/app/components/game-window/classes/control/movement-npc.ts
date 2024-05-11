import { ControlStatus } from "../../utils/control-status";
import { MoveCommand } from "../common/move-command";
import { MoveResult } from "../common/move-result";
import { XY } from "../common/x-y";

export function basicFollow(ownLocation: XY, targetLocation: XY): ControlStatus {
    const sideSpacing = {x: 20, y: 20};
    return  {
        UP : ownLocation.y > targetLocation.y - sideSpacing.y,
        DOWN : ownLocation.y < targetLocation.y + sideSpacing.y,
        LEFT : ownLocation.x > targetLocation.x - sideSpacing.x,
        RIGHT : ownLocation.x < targetLocation.x + sideSpacing.x,
    };
}

export function moveWithinBorder(command: MoveCommand): MoveResult {
    // Primary movement up down
    var deltaY = 0;
    deltaY += command.controlStatus.DOWN ? 1 : 0;
    deltaY += command.controlStatus.UP ? -1 : 0;
    
    var deltaX = 0;
    deltaX += command.controlStatus.RIGHT ? 1 : 0;
    deltaX += command.controlStatus.LEFT ? -1 : 0;
    // Adjust for diagonal movement
    const square = 1/Math.sqrt(2);
    deltaX *= command.controlStatus.UP || command.controlStatus.DOWN ? square : 1;
    deltaY *= command.controlStatus.RIGHT || command.controlStatus.LEFT ? square : 1;

    // Adjust for seepd
    deltaX *= command.speed;
    deltaY *= command.speed;

    const facingRight = deltaX >= 0;

    const newPosition = adjustIfInBounds(command, deltaX, deltaY);
    return {newPosition: newPosition, oldPosition: command.currentPosition, facingRight: facingRight};
}

function adjustIfInBounds(command: MoveCommand, deltaX: number, deltaY: number): XY {
    const sideSpacing = [
        command.width / 2, 
        command.height / 2];
    var adjustedX = command.currentPosition.x + deltaX;
    if (adjustedX < command.borderP1.x + sideSpacing[0]) {
        adjustedX = command.borderP1.x + sideSpacing[0];
    } else if (adjustedX > command.borderP2.x - sideSpacing[0]) {
        adjustedX = command.borderP2.x - sideSpacing[0];
    }
    
    var adjustedY = command.currentPosition.y + deltaY;
    if (adjustedY < command.borderP1.y + sideSpacing[1]) {
        adjustedY = command.borderP1.y + sideSpacing[1];
    } else if (adjustedY > command.borderP2.y - sideSpacing[1]) {
        adjustedY = command.borderP2.y - sideSpacing[1];
    }command.borderP1

    return {x: adjustedX, y: adjustedY};
}