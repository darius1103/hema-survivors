import { Subject } from "rxjs";
import { AttackEvent } from "./attack-event";
import { DeathEvent } from "./death-event";
import { HitEvent } from "./hit-event";

export interface EventsStreams {
    death: Subject<DeathEvent>,
    hit: Subject<HitEvent>,
    attack: Subject<AttackEvent>,
}