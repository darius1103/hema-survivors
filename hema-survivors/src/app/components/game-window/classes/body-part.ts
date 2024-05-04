import { combineAll, range } from "rxjs";
import { AppendCommand } from "../utils/appendCommand";
import { Sprite } from "./sprite";
import { XYLocation } from "./xylocation";

export class BodyPart {
    protected sprite: Sprite = new Sprite([]);
    protected anchorPoints: XYLocation[] = [];

    public getSprite(): Sprite {
        return this.sprite;
    }

    public getAnchorPoints(): XYLocation[] {
        return this.anchorPoints;
    }
    
    public appendBodyPart(command: AppendCommand): number[][] {
        let deviationX = command.anchorPoint.x - command.innerAnchorPoint.x;
        let deviationY = command.anchorPoint.y - command.innerAnchorPoint.y;

        if (deviationX < 0) {
            for (let i = 0; i < 0 - deviationX; i ++) {
                command.targetFrameData.unshift([]);
                this.anchorPoints.forEach((point) => {
                    point.x++;
                });
                command.anchorPoint.x++;
            }
        }
        deviationX = command.anchorPoint.x - command.innerAnchorPoint.x;

        command.sourceFrameData.forEach((row: number[], rowIndex: number) => {
            command.targetFrameData[rowIndex + deviationX] = 
                command.targetFrameData[rowIndex + deviationX] ? 
                command.targetFrameData[rowIndex + deviationX] : [];
            row.forEach((value: number, columnIndex: number) => {
                if (value) {
                    command.targetFrameData[rowIndex + deviationX][columnIndex + deviationY] = 
                        command.under && command.targetFrameData[rowIndex + deviationX][columnIndex + deviationY] ? 
                        command.targetFrameData[rowIndex + deviationX][columnIndex + deviationY] : value;
                }
            });
        });
        return command.targetFrameData;
    }

    public logFrame(frameData: number[][]): void {
        console.log("frame");
        frameData.forEach(row => {
            console.log("row: " + row.toString());
        });
    }
}