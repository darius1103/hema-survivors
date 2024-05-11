import { Weapon } from "./weapon";
import { BasicEnemyController } from "../control/basic-enemy-controller";
import { XY } from "./x-y";

export interface AttackCommand {
    hitAreas: Map<string, Map<string, BasicEnemyController>>, 
    weapon: Weapon, 
    ownLocation: XY, 
    ltr: boolean,
    damageRangeMax: number,
    damageRangeMin: number
}