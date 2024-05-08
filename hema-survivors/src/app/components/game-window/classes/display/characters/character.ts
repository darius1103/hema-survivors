import { CharacterConfig } from "../../common/character-config";
import { Arm } from "../../components/body/arm";
import { Head } from "../../components/body/head";
import { Leg } from "../../components/body/leg";
import { Torso } from "../../components/body/torso";
import { Waist } from "../../components/body/waist";
import { Sprite } from "../sprite";

export class Character {
    private sprite: Sprite;
    private config: CharacterConfig;

    constructor(config: CharacterConfig) {
        const segments = [];
        const torso = new Torso(config.torso).getSprite();
        const xModifier = 11;
        const yModifier = 0;
        segments.push({
            sprite: torso, 
            under: false, 
            anchorPoint: {x: 22 - xModifier, y: 27 - yModifier},
            name: "TORSO"
        });
        const head = new Head(config.head).getSprite();
        segments.push({
            sprite: head, 
            under: false, 
            anchorPoint: {x: 25 - xModifier, y: 20 - yModifier},
            name: "HEAD"
        });
        const rightArm = new Arm(config.rightArm).getSprite();
        segments.push({
            sprite: rightArm, 
            under: false, 
            anchorPoint: {x: 16 - xModifier, y: 29 - yModifier},
            name: "RIGHT_ARM"
        });
        const leftArm = new Arm(config.leftArm).getSprite();
        segments.push({
            sprite: leftArm, 
            under: false, 
            anchorPoint: {x: 26 - xModifier, y: 30 - yModifier},
            name: "LEFT_ARM"
        });
        const waist = new Waist(config.waist).getSprite();
        segments.push({
            sprite: waist, 
            under: true, 
            anchorPoint: {x: 22 - xModifier, y: 44 - yModifier},
            name: "WAIST"
        });
        const right_leg = new Leg(config.rightLeg).getSprite();
        segments.push({
            sprite: right_leg, 
            under: true, 
            anchorPoint: {x: 17 - xModifier, y: 49 - yModifier},
            name: "RIGHT_LEG"
        });
        const left_leg = new Leg(config.leftLeg).getSprite();
        segments.push({
            sprite: left_leg, 
            under: true, 
            anchorPoint: {x: 26 - xModifier, y: 49 - yModifier},
            name: "LEFT_LEG"
        });
        this.sprite = new Sprite(segments, [[]], {x: 0 - xModifier, y: 0- yModifier}, true);
        this.config = config;
    }

    public getSprite(): Sprite {
        return this.sprite;
    }

    public getConfig(): CharacterConfig {
        return this.config;
    }
}