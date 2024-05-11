import { Subject } from "rxjs";
import { AttackEvent } from "../../utils/attack-event";
import { AttackConfig } from "./attack-config";
import { XY } from "./x-y";

export interface EnemyAttackCommand {
    id: string,
    config: AttackConfig,
    location: XY,
    distance: number, 
    attack$: Subject<AttackEvent>,
    ltr: boolean
}