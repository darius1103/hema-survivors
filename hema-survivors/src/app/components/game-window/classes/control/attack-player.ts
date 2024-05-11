import { PIXEL_SIZE, SPRITE_SIZE } from "../../utils/globals";
import { AttackCommand } from "../common/attack-command";
import { Box } from "../common/box";
import { XY } from "../common/x-y";
import { BasicEnemyController } from "./basic-enemy-controller";
import { AttackController } from "./attack-controller";

export class AttackPlayer extends AttackController {
    public attack(command: AttackCommand): void {
        if (Date.now() - (command.weapon.lastAttack as any) < (command.weapon.attackDelay as any)) {
            return;
        }
        command.weapon.lastAttack = Date.now();
        const ids = this.determineAttackRange(command.ownLocation);
        const enemiesInRange = ids
         .filter(id => command.hitAreas.has(id))
         .map(id => command.hitAreas.get(id))
         .filter((area: any) => area || area.size === 0)
         .flatMap((area: any) => Array.from(area.values()));
        if (enemiesInRange.length == 0) {
            console.log("no enemies in range");
            command.weapon.adjustedAttackBoxes = [];
            return;
        }
        console.log("Enemies in range: " + enemiesInRange.length);
        command.weapon.adjustedAttackBoxes = this.mapBoxesToAbsolute(command.ltr ? 
            (command.weapon.attackBoxesLTR as any):  
            (command.weapon.attackBoxesRTL as any), command.ownLocation);
        enemiesInRange
            .forEach((enemy: any) => (enemy as BasicEnemyController)
                .attemptAttack(command.weapon.adjustedAttackBoxes as any, this.calculateDamate(command)));
    }

    private calculateDamate(command: AttackCommand): number {
        return command.weapon.damage +
            Math.floor(Math.random() * (command.damageRangeMax - command.damageRangeMin) + command.damageRangeMin);
    }

    private determineAttackRange(ownLocation: XY): string[] {
        const ownXID = Math.floor(ownLocation.x / 50);
        const ownYID = Math.floor(ownLocation.y / 50);
        const areas = [];
        const range = 3;
        for (let i = -range; i <= range; i ++) {
            for (let j = -range; j <= range; j ++) {
                areas.push((ownXID + i) + "-" + (ownYID - j))
            }
        }
        return areas;
    }

    private mapBoxesToAbsolute(boxes: Box[], location: XY): Box[] {
        return boxes.map(box => this.mapBoxToAbsolute(box, location));
    }

    private mapBoxToAbsolute(box: Box, location: XY): Box {
        const x1 = location.x - ((SPRITE_SIZE * PIXEL_SIZE) / 2) + box.p1.x;
        const y1 = location.y - ((SPRITE_SIZE * PIXEL_SIZE) / 2) + box.p1.y;
        const x2 = location.x - ((SPRITE_SIZE * PIXEL_SIZE) / 2) + box.p2.x;
        const y2 = location.y - ((SPRITE_SIZE * PIXEL_SIZE) / 2) + box.p2.y;
        return {p1: {x: x1, y: y1}, p2: {x: x2, y: y2}};
    }
}