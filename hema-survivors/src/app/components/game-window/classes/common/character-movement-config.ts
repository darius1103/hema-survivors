import { Observable } from "rxjs";
import { ControlStatus } from "../../utils/control-status";
import { EventsStreams } from "../../utils/events-streams";
import { XY } from "./x-y";

export interface CharacterMovementConfig {
    controlStatus: ControlStatus,
    control$: Observable<ControlStatus>,
    eventStreams: EventsStreams,
    absolutePosition: XY,
    oldAbsolutePosition: XY,
    speed: number,
    facingRight: boolean,
}