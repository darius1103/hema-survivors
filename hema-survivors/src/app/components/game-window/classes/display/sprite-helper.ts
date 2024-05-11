import { colorToCode } from "../../utils/colorLookUp";
import { MAGIC_BOX_ALIGNMENT, PIXEL_SIZE, SPRITE_SIZE } from "../../utils/globals";
import { Box } from "../common/box";
import { CharacterConfig } from "../common/character-config";
import { CombinedData } from "../common/combined-data";
import { SegmentConfig } from "../common/segment-config";
import { XY } from "../common/x-y";
import { Sprite } from "./sprite";

export class SpriteHelper {
    public width(data: number[][]): number {
        let max = 0;
        data.forEach(row => max = Math.max(row.length, max));
        return max;
    }

    public centerData(data: number[][]): number[][] {
        const centered: number[][] = [];
        for (let i = 0; i < SPRITE_SIZE; i ++) {
            centered.push(new Array(SPRITE_SIZE).fill(0));
        }

        const spriteW = this.width(data);
        const spriteH = data.length;
        const widthDif = SPRITE_SIZE - spriteW;
        const heightDif = SPRITE_SIZE - spriteH;
        for (let i = 0; i < spriteH; i++) {
            if (data[i] ===  undefined) {
                continue;
            }
            for (let j = 0; j < spriteW; j++) {
                const offsetX = j + Math.floor(widthDif / 2);
                const offsetY = i + Math.floor(heightDif / 2);
                centered[offsetY][offsetX] = data[i][j] ? data[i][j] : 0;
                console.log(offsetX, offsetX);
            }
        }
        return centered;
    }

    public centerBoxesH(boxes: Box[]): Box[] {
        const centered: Box[] = [];
        boxes.forEach(box => {
            const boxW = box.p2.x - box.p1.x;
            const x = MAGIC_BOX_ALIGNMENT;
            if (boxW > 1) {
                centered.push({
                    p1: {x: box.p1.x + x, y : box.p1.y},
                    p2: {x: box.p2.x + x, y : box.p2.y}}
                );
            }
        });
        return centered;
    }

    public flipData(width: number, data: number[][]): number[][] {
        const fliped: number[][] = [];
        data.forEach(row => {
            const flippedRow = row.slice().reverse();
            const sizeDif = width - row.length;
            for (let i = 0; i < sizeDif; i++) {
                flippedRow.unshift(0);
            } 
            fliped.push(flippedRow);
        });
        return fliped;
    }

    public calculateHitBox(data: number[][]): Box {
        let x1 = data[0].length;
        let x2 = 0;
        let y1 = data.length;
        let y2 = 0;
        data.forEach((row, rowIndex) => {
            row.forEach((value, columnIndex) => {
                if (value !== 0) {
                    x1 = Math.min(x1, columnIndex);
                    x2 = Math.max(x2, columnIndex);
                    y1 = Math.min(y1, rowIndex);
                    y2 = Math.max(y2, rowIndex);
                }
            });
        });
        return {p1: {x: x1, y: y1}, p2: {x: x2 + 1, y: y2 + 1}};
    }
    
    public flipAnchor(width: number, anchor: XY): XY {
        return  {
            x: width - anchor.x,
            y: anchor.y
        };
    };

    public flipBox(width: number, box: Box): Box {
        return {
            p1: {
                x: width - 1 - box.p2.x,
                y: box.p1.y
            },
            p2: {
                x: width - 1 - box.p1.x,
                y: box.p2.y
            }
        };
    };

    public combineWithSegments(sprite: Sprite, ltr: boolean, config: CharacterConfig): CombinedData {
        const segments = sprite.getSegments(ltr);
        let data = sprite.getData(ltr);
        const hitBox = sprite.getHitBox(ltr);
        const anchor = sprite.getAnchor(ltr);
        let acumulatedBoxes = [hitBox];
        if (segments.length === 0) {
            return {data: data, boxes: acumulatedBoxes, anchor: anchor};
        }

        segments.forEach((segment: SegmentConfig) => {
            const segmentData = segment.sprite.getCombinedData(ltr, config);
            const sourceAnchor = segment.anchorPoint;
            let deviationX = sourceAnchor.x - segmentData.anchor.x;
            let deviationY = sourceAnchor.y - segmentData.anchor.y;


            if (deviationX < 0) {
                for (let i = 0; i < 0 - deviationX; i ++) {
                    data.forEach(row => row.unshift(0));
                    anchor.x++;
                    segments.forEach(s => s.anchorPoint.x++);
                    acumulatedBoxes.forEach(box => {
                        box.p1.x++;
                        box.p2.x++;
                    });
                }
            } else {
                segmentData.boxes.forEach(box => {
                    box.p1.x+=deviationX;
                    box.p2.x+=deviationX;
                });
            }

            if (deviationY < 0) {
                for (let i = 0; i < 0 - deviationY; i ++) {
                    data.unshift(new Array(SPRITE_SIZE).fill(0));
                    anchor.y++;
                    segments.forEach(s => s.anchorPoint.y++);
                    acumulatedBoxes.forEach(box => {
                        box.p1.y++;
                        box.p2.y++;
                    });
                }
            } else {
                segmentData.boxes.forEach(box => {
                    box.p1.y+=deviationY;
                    box.p2.y+=deviationY;
                });
            }
            acumulatedBoxes = acumulatedBoxes.concat(segmentData.boxes);

            deviationX = sourceAnchor.x - segmentData.anchor.x;
            deviationY = sourceAnchor.y - segmentData.anchor.y;

            segmentData.data.forEach((row: number[], rowIndex: number) => {
                const deltaY = rowIndex + deviationY;
                data[deltaY] =  data[deltaY] ? data[deltaY] : [];
            row.forEach((segmentColorCode: number, columnIndex: number) => {
                if (segmentColorCode) {
                    const deltaX = columnIndex + deviationX;
                    const orignalColorCode = data[deltaY][deltaX];
                    const shouldKeepOriginalColor = segment.under && orignalColorCode;
                    
                    if (shouldKeepOriginalColor) {
                        data[deltaY][deltaX] = orignalColorCode;
                    } else {
                        data[deltaY][deltaX] = segment.sprite.getApplyTheme() ?
                            this.adjustForTheme(segmentColorCode, config) : segmentColorCode;
                    }
                }});
            });
        });
        acumulatedBoxes = acumulatedBoxes.filter(box => box.p1.x === box.p1.x || box.p1.y === box.p1.y);
        return {data: data, boxes: acumulatedBoxes, anchor: anchor};
    }

    private adjustForTheme(value: number, config: CharacterConfig): number {
        // 0 transparent
        // 1 primary color
        // 2 secondary color
        // 3 third color
        // 4 black
        // default original
        if (!config.colors) {
            return value;
        }
        switch(value) {
            case 1:
                return colorToCode.has(config.colors?.primaryColor as any) ? 
                    colorToCode.get(config.colors?.primaryColor as any) as any : 
                    value;
            case 2:
                return colorToCode.has(config.colors?.secondaryColor as any) ? 
                    colorToCode.get(config.colors?.secondaryColor as any) as any : 
                    value;
            case 3:
                return colorToCode.has(config.colors?.thirdColor as any) ? 
                    colorToCode.get(config.colors?.thirdColor as any) as any : 
                    value;
            case 4:
                return 2;
            default:
                return value;
        }
    }
}