import { PIXEL_SIZE, SPRITE_SIZE } from "../../utils/globals";
import { AttackCommand } from "../common/attack-command";
import { Box } from "../common/box";
import { XY } from "../common/x-y";

export class AttackController {
    protected checkColision(box1: Box, boxes: Box[]): boolean {
        return boxes.some((box2) => {
            // no horizontal overlap
            if (box1.p1.x >= box2.p2.x || box2.p1.x >= box1.p2.x) return false;

            // no vertical overlap
            if (box1.p1.y >= box2.p2.y || box2.p1.y >= box1.p2.y) return false;

            return true;
        });
    }

    protected mapBoxesToAbsolute(boxes: Box[], location: XY): Box[] {
        return boxes.map(box => this.mapBoxToAbsolute(box, location));
    }

    protected mapBoxToAbsolute(box: Box, location: XY): Box {
        const x1 = location.x - ((SPRITE_SIZE * PIXEL_SIZE) / 2) + box.p1.x * PIXEL_SIZE;
        const y1 = location.y - ((SPRITE_SIZE * PIXEL_SIZE) / 2) + box.p1.y * PIXEL_SIZE;
        const x2 = location.x - ((SPRITE_SIZE * PIXEL_SIZE) / 2) + box.p2.x * PIXEL_SIZE;
        const y2 = location.y - ((SPRITE_SIZE * PIXEL_SIZE) / 2) + box.p2.y * PIXEL_SIZE;
        return {p1: {x: x1, y: y1}, p2: {x: x2, y: y2}};
    }

    protected calculateDamage(damage: number, min: number, max: number): number {
        return damage + Math.floor(Math.random() * (max - min) + min);
    }
}