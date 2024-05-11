import { ControlStatus } from "../../utils/control-status";
import { XY } from "./x-y";

export interface MoveCommand {
    borderP1: XY, 
    borderP2: XY, 
    controlStatus: ControlStatus,
    currentPosition: XY,
    speed: number,
    width: number,
    height: number
}