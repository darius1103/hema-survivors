import { SPRITE_HELPER } from "../../utils/globals";
import { Box } from "../common/box";
import { CharacterConfig } from "../common/character-config";
import { CombinedData } from "../common/combined-data";
import { SegmentConfig } from "../common/segment-config";
import { XY } from "../common/x-y";

export class Sprite {
    private dataLTR: number[][];
    private applyTheme: boolean;
    private segments: SegmentConfig[];
    private anchorLTR: XY;
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
        this.width = SPRITE_HELPER.width(this.dataLTR);
        this.height = this.dataLTR.length;
        this.combinedData = null;
    }

    public getHeight(): number {
        return this.height;
    }

    public getWidth(): number {
        return this.width;
    }

    public getSegments(ltr: boolean): SegmentConfig[] {
        if (ltr) {
            return this.segments;
        } else {
            const reversed: SegmentConfig[] = [];
            this.segments.forEach(segment => {
                reversed.push({
                    sprite: segment.sprite,
                    under: segment.under,
                    anchorPoint: SPRITE_HELPER.flipAnchor(this.width, segment.anchorPoint),
                    name: segment.name + ""
                })
            });
            return reversed;
        }
    }

    public getAnchor(ltr: boolean): XY {
        return ltr ? this.anchorLTR: SPRITE_HELPER.flipAnchor(this.width, this.anchorLTR);
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
        const target = ltr ? this.dataLTR : SPRITE_HELPER.flipData(this.width, this.dataLTR);
        target.forEach(row => copy.push([...row]));
        return copy;
    }

    public getHitBox(ltr: boolean): Box {
        return SPRITE_HELPER.calculateHitBox(this.getData(ltr));
    }
}