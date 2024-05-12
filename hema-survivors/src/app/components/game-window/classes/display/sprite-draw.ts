import { DrawCommand } from "../common/draw-command";
import { HealthBarDrawCommand } from "../common/health-bar-draw-command copy";

export function drawStT(command: DrawCommand): void {
    const x = Math.round(command.position.x - command.sourceCtx.width/2);
    const y = Math.round(command.position.y - command.sourceCtx.height/2);
    command.targetCtx.drawImage(command.sourceCtx, x, y, command.sourceCtx.width, command.sourceCtx.height);
}

export function drawHealthBar(command: HealthBarDrawCommand): void {
    const adjustedLocation = {
        x: command.location.x + command.config.location.x - command.config.width / 2,
        y: command.location.y + command.config.location.y
    };
    const currentWidth = Math.floor(command.config.width * command.percentage);
    command.ctx.fillStyle = command.config.style;
    command.ctx.fillRect(adjustedLocation.x, adjustedLocation.y, currentWidth, command.config.height);
    console.log('currentWidth:' + currentWidth);
    console.log(command);
}