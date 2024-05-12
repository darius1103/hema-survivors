import { SPRITE_SIZE } from "../../../utils/globals";
import { Box } from "../../common/box";
import { SegmentConfig } from "../../common/segment-config";
import { Weapon } from "../../common/weapon";
import { FEDER_BLADE, FEDER_GUARD, FEDER_HANDLE, FEDER_SHILT } from "../../display/data/sprites";
import { Sprite } from "../../display/sprite";
import { Component } from "../component";

export class Feber extends Component {
    private weapon: Weapon;
    
    constructor() {
        super();
        const half = SPRITE_SIZE / 2;
        const eitgh = SPRITE_SIZE / 8;
        const attackBoxesLTR: Box[] = [];
        const attackBoxesRTL: Box[] = [];
        for (let i = 1; i < 5; i++) {
            attackBoxesLTR.push({p1: {x: half, y: i * eitgh}, p2: {x: half + eitgh * (i + 1), y: (i + 1) * eitgh}});
            attackBoxesRTL.push({p1: {x: half - eitgh * (i + 1), y: i * eitgh}, p2: {x: half, y: (i + 1) * eitgh}})
        }
        this.weapon = {
            attackBoxesLTR,
            attackBoxesRTL,
            damage: 4,
            adjustedAttackBoxes: [],
            attackDelay: 2000,
            lastAttack: 0
        }
        const blade = new Sprite([], FEDER_BLADE, {x: 0, y: 23}, false);
        const configB: SegmentConfig = {sprite: blade, under: false, anchorPoint: {x: 2, y:-1}};
        const guard = new Sprite([configB], FEDER_GUARD, {x: 3, y: 0}, false);
        const configG: SegmentConfig = {sprite: guard, under: false, anchorPoint: {x: 1, y:-1}};
        const schilt = new Sprite([], FEDER_SHILT, {x: 2, y: 1}, false);
        const configS: SegmentConfig = {sprite: schilt, under: false, anchorPoint: {x: 1, y:-2}};
        this.sprite = new Sprite([configG, configS], FEDER_HANDLE, {x: 2, y: 0}, false);
    }

    public getWeapon(): Weapon {
        return this.weapon;
    }
 }