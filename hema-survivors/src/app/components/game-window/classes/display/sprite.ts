import { SPRITE_HELPER } from "../../utils/globals";
import { Box } from "../common/box";
import { CharacterConfig } from "../common/character-config";
import { CombinedData } from "../common/combined-data";
import { SegmentConfig } from "../common/segment-config";
import { XY } from "../common/x-y";

export class Sprite {
    private dataLTR: number[][];
    private dataRTL: number[][];
    private hitBoxLTR: Box;
    private hitBoxRTL: Box;
    private applyTheme: boolean;
    private segments: SegmentConfig[];
    private anchorLTR: XY;
    private anchorRTL: XY;
    private combinedData: CombinedData | null;
    private width: number;
    private height: number;

    constructor(
        segments: SegmentConfig[] = [], 
        dataLTR: number[][] = [],
        anchor: XY, 
        applyTheme: boolean = false) {
        this.segments = segments;
        this.dataLTR = dataLTR;
        this.anchorLTR = anchor;
        this.applyTheme = applyTheme;
        this.hitBoxLTR = SPRITE_HELPER.calculateHitBox(this.dataLTR);
        this.width = SPRITE_HELPER.width(this.dataLTR);
        this.height = this.dataLTR.length;
        this.dataRTL = SPRITE_HELPER.flipData(this.width, this.dataLTR);
        this.anchorRTL = SPRITE_HELPER.flipAnchor(this.width, this.anchorLTR);
        this.hitBoxRTL = SPRITE_HELPER.flipBox(this.width, this.hitBoxLTR);
        this.combinedData = null;
    }

    public getDataLTR(): number[][] {
        return this.dataLTR;
    }

    public getDataRTL(): number[][] {
        return this.dataRTL;
    }

    public getHitBoxLTR(): Box {
        return this.hitBoxLTR;
    }

    public getHitBoxRTL(): Box {
        return this.hitBoxRTL;
    }

    public getHeight(): number {
        return this.height;
    }

    public getWidth(): number {
        return this.width;
    }

    public getSegments(ltr: boolean): SegmentConfig[] {
        return ltr ? 
            this.segments : 
            this.segments.map(segment => {
                const width = this.getData(ltr)[0].length;
                segment.anchorPoint = SPRITE_HELPER.flipAnchor(width, segment.anchorPoint);
                return segment;
            });
    }

    public getAnchor(ltr: boolean): XY {
        return ltr ? this.anchorLTR: this.anchorRTL;
    }

    public getApplyTheme(): boolean {
        return this.applyTheme;
    }

    public getCombinedData(ltr: boolean, config: CharacterConfig): CombinedData {
        this.combinedData = this.combinedData ? this.combinedData : SPRITE_HELPER.combineWithSegments(this, ltr, config);
        return this.combinedData;
    }

    public getData(ltr: boolean): number[][] {
        const copy: number[][] = [];
        const target = ltr ? this.dataLTR : this.dataRTL;
        target.forEach(row => copy.push([...row]));
        return copy;
    }

    public getHitBox(ltr: boolean): Box {
        return ltr ? this.hitBoxLTR : this.hitBoxRTL;
    }
}