import { Box } from "./box"
import { XY } from "./x-y"

export interface CombinedData {
    data: number[][],
    boxes: Box[],
    anchor: XY,
}