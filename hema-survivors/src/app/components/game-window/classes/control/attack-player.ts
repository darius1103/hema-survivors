import { PIXEL_SIZE } from "../../utils/globals";
import { AttackCommand } from "../common/attack-command";
import { XY } from "../common/x-y";
import { BasicEnemyController } from "./basic-enemy-controller";
import { AttackController } from "./attack-controller";
import { AttackEvent } from "../../utils/attack-event";
import { Box } from "../common/box";
import { Subject } from "rxjs";

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
            console.log("No enemies in range");
            command.weapon.adjustedAttackBoxes = [];
            return;
        }
        console.log("Enemies in range: " + enemiesInRange.length);
        command.weapon.adjustedAttackBoxes = this.mapBoxesToAbsolute(command.ltr ? 
            (command.weapon.attackBoxesLTR as any):  
            (command.weapon.attackBoxesRTL as any), command.ownLocation);
        enemiesInRange
            .forEach((enemy: any) => (enemy as BasicEnemyController)
                .attemptAttack(
                    command.weapon.adjustedAttackBoxes as any, 
                    this.calculateDamage(command.weapon.damage, command.damageRangeMin, command.damageRangeMax)));
    }

    private determineAttackRange(ownLocation: XY): string[] {
        const ownXID = Math.floor(ownLocation.x / 50);
        const ownYID = Math.floor(ownLocation.y / 50);
        const areas = [];
        const range = PIXEL_SIZE + 1;
        for (let i = -range; i <= range; i ++) {
            for (let j = -range; j <= range; j ++) {
                areas.push((ownXID + i) + "-" + (ownYID - j))
            }
        }
        return areas;
    }

    public attemptAttack(event: AttackEvent, hitBoxes: Box[], ownLocation: XY, boxes$: Subject<Box[]>): boolean {
        const adjusted = this.mapBoxesToAbsolute(hitBoxes, ownLocation);
        boxes$.next(adjusted);
        return adjusted
            .some((box) => this.checkColision(box, event.boxes));
    }
}