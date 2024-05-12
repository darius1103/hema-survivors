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
    private anchor: XY;
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
        this.anchor = anchor;
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
        const cloned: SegmentConfig[] = [];
            this.segments.forEach(segment => {
                cloned.push({
                    sprite: segment.sprite,
                    under: segment.under,
                    anchorPoint: ltr ? 
                        SPRITE_HELPER.cloneAnchor(segment.anchorPoint) : 
                        SPRITE_HELPER.flipAnchor(this.width, segment.anchorPoint),
                    name: segment.name + ""
                })
            });
        return cloned;
        // if (ltr) {
        //     return this.segments;
        // } else {
        //     const cloned: SegmentConfig[] = [];
        //     this.segments.forEach(segment => {
        //         cloned.push({
        //             sprite: segment.sprite,
        //             under: segment.under,
        //             anchorPoint: SPRITE_HELPER.flipAnchor(this.width, segment.anchorPoint),
        //             name: segment.name + ""
        //         })
        //     });
        //     return cloned;
        // }
    }

    public getAnchor(ltr: boolean): XY {
        return ltr ? SPRITE_HELPER.cloneAnchor(this.anchor): SPRITE_HELPER.flipAnchor(this.width, this.anchor);
    }

    public getApplyTheme(): boolean {
        return this.applyTheme;
    }

    public getCombinedData(ltr: boolean, config: CharacterConfig): CombinedData {
        return SPRITE_HELPER.combineWithSegments(this, ltr, config);
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