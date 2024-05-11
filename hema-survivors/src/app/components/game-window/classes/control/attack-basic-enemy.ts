import { Subject } from "rxjs";
import { AttackEvent } from "../../utils/attack-event";
import { Box } from "../common/box";
import { EnemyAttackCommand } from "../common/enemy-attack-command";
import { XY } from "../common/x-y";
import { AttackController } from "./attack-controller";

export class AttackBasicEnemy extends AttackController {
    public attack(command: EnemyAttackCommand): void {
        if (command.distance > command.config.range) {
            return;
        }
        command.config.weapons
            .filter(weapon => Date.now() - weapon.lastAttack > weapon.attackDelay)
            .forEach((weapon) => {
                weapon.lastAttack = Date.now();
                const boxes = command.ltr ? weapon.attackBoxesLTR : weapon.attackBoxesRTL;
                const event: AttackEvent = {
                    damage: this.calculateDamage(weapon.damage, command.config.damageRangeMin, command.config.damageRangeMax),
                    location: command.location,
                    id: command.id,
                    boxes: this.mapBoxesToAbsolute(boxes, command.location)
                }
                command.attack$.next(event);
            });
    }

    public attemptAttack(attackBoxes: Box[], hitBoxes: Box[], ownLocation: XY, boxes$: Subject<Box[]>): boolean {
        const adjusted = this.mapBoxesToAbsolute(hitBoxes, ownLocation);
        boxes$.next(adjusted);
        return adjusted
            .some((box) => this.checkColision(box, attackBoxes));
    }
}