import { range } from "rxjs";
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
        const bodyPartFrame = command.bodyPart.getSprite().frames[command.index];
        const bodyPartAnchor = command.bodyPart.getAnchorPoints()[command.index];
        let deviationX = command.anchorPoint.x - bodyPartAnchor.x;
        let deviationY = command.anchorPoint.y - bodyPartAnchor.y;

        if (deviationX < 0) {
            for (let i = 0; i < 0 - deviationX; i ++) {
                command.frameData.unshift([]);
                this.anchorPoints.forEach((point) => {
                    point.x++;
                });
                command.anchorPoint.x++;
            }
        }
        deviationX = command.anchorPoint.x - bodyPartAnchor.x;

        bodyPartFrame.data.forEach((row: number[], rowIndex: number) => {
            command.frameData[rowIndex + deviationX] = 
                command.frameData[rowIndex + deviationX] ? 
                command.frameData[rowIndex + deviationX] : [];
            row.forEach((value: number, columnIndex: number) => {
                if (value) {
                    command.frameData[rowIndex + deviationX][columnIndex + deviationY] = 
                        command.under && command.frameData[rowIndex + deviationX][columnIndex + deviationY] ? 
                        command.frameData[rowIndex + deviationX][columnIndex + deviationY] : value;
                }
            });
        });
        return command.frameData;
    }

    public logFrame(frameData: number[][]): void {
        console.log("frame");
        frameData.forEach(row => {
            console.log("row: " + row.toString());
        });
    }
}