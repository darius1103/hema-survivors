import { DrawCommand } from "../common/draw-commabd";

export function drawStT(command: DrawCommand): void {
    const x = Math.round(command.position.x - command.sourceCtx.width/2);
    const y = Math.round(command.position.y - command.sourceCtx.height/2);
    command.targetCtx.drawImage(command.sourceCtx, x, y, command.sourceCtx.width, command.sourceCtx.height);
}