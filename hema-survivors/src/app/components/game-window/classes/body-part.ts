import { combineAll, range } from "rxjs";
import { AppendCommand } from "../utils/appendCommand";
import { colorToCode } from "../utils/colorLookUp";
import { FighterSettings } from "../utils/fitherSettings";
import { Sprite } from "./sprite";
import { XYLocation } from "./xylocation";

export class BodyPart {
    protected settings: FighterSettings | null;
    protected data: number[][] =  null as any;
    protected sprite: Sprite = new Sprite([]);
    protected anchorPoints: XYLocation[] = [];

    constructor(settings: FighterSettings | null = null) {
        this.settings = settings;
    }

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

    public adjustDataForTheme(): number[][] {
        // 0 transparent
        // 1 primary color
        // 4 secondary color
        // 3 third color
        // 4 black
        return this.data.map(row => row.map(value => this.adjustForTheme(value)))
    } 

    private adjustForTheme(value: number): number {
        if (!this.settings) {
            return value;
        }
        switch(value) {
            case 1:
                return colorToCode.has(this.settings?.primaryColor as any) ? 
                    colorToCode.get(this.settings?.primaryColor as any) as any : 
                    value;
            case 2:
                return colorToCode.has(this.settings?.secondaryColor as any) ? 
                    colorToCode.get(this.settings?.secondaryColor as any) as any : 
                    value;
            case 3:
                return colorToCode.has(this.settings?.thirdColor as any) ? 
                    colorToCode.get(this.settings?.thirdColor as any) as any : 
                    value;
            case 4:
                return 2;
            default:
                return value;
        }
    }

    public addOverlay(anchor: XYLocation, data: number[][]): number[][] {
        return this.appendBodyPart({
            targetFrameData: this.data, 
            sourceFrameData: data, 
            anchorPoint: anchor,
            innerAnchorPoint: new XYLocation(0, 0),
            index: 0, 
            under: false}
        );
    }
}