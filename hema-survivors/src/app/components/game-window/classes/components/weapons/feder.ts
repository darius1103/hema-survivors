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
        const attackBoxesLTR: Box[] = [
            {p1: {x: SPRITE_SIZE / 2, y: 0}, p2: {x: SPRITE_SIZE, y: SPRITE_SIZE / 4}},
            {p1: {x: SPRITE_SIZE / 2, y: SPRITE_SIZE / 4}, p2: {x: SPRITE_SIZE, y: SPRITE_SIZE / 2}}
        ];
        const attackBoxesRTL: Box[] = [
            {p1: {x: SPRITE_SIZE / 4, y: 0}, p2: {x: SPRITE_SIZE / 2 , y: SPRITE_SIZE / 4}},
            {p1: {x: 0, y: SPRITE_SIZE / 4}, p2: {x: SPRITE_SIZE / 2, y: SPRITE_SIZE / 2}}
        ];
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