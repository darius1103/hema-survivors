import { Subject } from "rxjs";
import { DeathEvent } from "./death-event";
import { HitEvent } from "./hit-event";

export interface EventsStreams {
    death: Subject<DeathEvent>,
    hit: Subject<HitEvent>
}