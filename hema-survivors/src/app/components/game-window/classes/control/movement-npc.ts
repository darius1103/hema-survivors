import { ControlStatus } from "../../utils/control-status";
import { XY } from "../common/x-y";

export function basicFollow(ownLocation: XY, targetLocation: XY): ControlStatus {
    const sideSpacing = {x: 20, y: 20};
    return  {
        UP : ownLocation.y > targetLocation.y - sideSpacing.y,
        DOWN : ownLocation.y < targetLocation.y + sideSpacing.y,
        LEFT : ownLocation.x > targetLocation.x - sideSpacing.x,
        RIGHT : ownLocation.x < targetLocation.x + sideSpacing.x,
    };
}