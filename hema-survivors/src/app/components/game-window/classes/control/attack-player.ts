import { PIXEL_SIZE, SPRITE_SIZE } from "../../utils/globals";
import { Box } from "../common/box";
import { CharacterControlConfig } from "../common/character-control-config";
import { XY } from "../common/x-y";
import { Enemy } from "../enemy";

export class AttackPlayer {
    private config: CharacterControlConfig;

    constructor(config: CharacterControlConfig) {
        this.config = config;
    }

    public attack(hitAreas: Map<string, Map<string, Enemy>>, ownLocation: XY, ltr: boolean = true): void {
        if (Date.now() - (this.config?.lastAttack as any) < (this.config?.attackDelay as any)) {
            return;
        }
        this.config.lastAttack = Date.now();
        const ids = this.determineAttackRange(ownLocation);
        const enemiesInRange = ids
         .filter(id => hitAreas.has(id))
         .map(id => hitAreas.get(id))
         .filter((area: any) => area || area.size === 0)
         .flatMap((area: any) => Array.from(area.values()));
        if (enemiesInRange.length == 0) {
            console.log("no enemies in range");
            this.config.adjustedAttackBox = [];
            return;
        }
        console.log("Enemies in range: " + enemiesInRange.length);
        this.config.adjustedAttackBox = this.mapBoxesToAbsolute(ltr ? 
            (this.config?.attackBoxesLTR as any):  
            (this.config?.attackBoxesRTL as any), ownLocation);
        enemiesInRange
            .forEach((enemy: any) => (enemy as Enemy)
                .attemptAttack(this.config.adjustedAttackBox as any, 4));
    }

    private determineAttackRange(ownLocation: XY): string[] {
        const ownXID = Math.floor(ownLocation.x / 50);
        const ownYID = Math.floor(ownLocation.y / 50);
        const areas = [];
        const range = 3;
        for (let i = -range; i <= range; i ++) {
            for (let j = -range; j <= range; j ++) {
                areas.push((ownXID + i) + "-" + (ownYID - j))
            }
        }
        return areas;
    }

    private mapBoxesToAbsolute(boxes: Box[], location: XY): Box[] {
        return boxes.map(box => this.mapBoxToAbsolute(box, location));
    }

    private mapBoxToAbsolute(box: Box, location: XY): Box {
        const x1 = location.x - ((SPRITE_SIZE * PIXEL_SIZE) / 2) + box.p1.x;
        const y1 = location.y - ((SPRITE_SIZE * PIXEL_SIZE) / 2) + box.p1.y;
        const x2 = location.x - ((SPRITE_SIZE * PIXEL_SIZE) / 2) + box.p2.x;
        const y2 = location.y - ((SPRITE_SIZE * PIXEL_SIZE) / 2) + box.p2.y;
        return {p1: {x: x1, y: y1}, p2: {x: x2, y: y2}};
    }
}