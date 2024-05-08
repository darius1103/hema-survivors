import { Color } from "../../../utils/color";
import { CharacterConfig } from "../../common/character-config";
import { Feber } from "../../components/weapons/feder";
import { HEAD, HEAD_CROSS, HEAD_HELMET, LEFT_ARM, LEFT_ARM_ALBOW, LEFT_ARM_GLOVE, LEFT_ARM_GUARD, LEFT_ARM_SLEAVE, LEFT_LEG, RIGHT_ARM, RIGHT_ARM_ALBOW, RIGHT_ARM_GLOVE, RIGHT_ARM_GUARD, RIGHT_ARM_SLEAVE, RIGHT_LEG, TORSO, TORSO_CROSS, WAIST } from "../data/sprites";
import { Sprite } from "../sprite";
import { Character } from "./character";


export function playerConfig(): CharacterConfig {
    return {
        rightArm: {
            sleave: false, 
            guard: false,
            albow: true,
            glove: true,
            weapon: true,
            sleave_config: 
                {   sprite: new Sprite([], RIGHT_ARM_SLEAVE, {x: 0, y: 0}, true), 
                    under: false, 
                    anchorPoint: {x: 0, y:0}
                }, 
            guard_config: 
                {   sprite: new Sprite([], RIGHT_ARM_GUARD, {x: 0, y: 0}, false), 
                    under: false, 
                    anchorPoint: {x: 5, y:6}
                },
            albow_config: 
                {   sprite: new Sprite([], RIGHT_ARM_ALBOW, {x: 0, y: 0}, false), 
                    under: false, 
                    anchorPoint: {x: 3, y:5}
                },
            glove_config: 
                {   sprite: new Sprite([], RIGHT_ARM_GLOVE, {x: 0, y: 0}, false), 
                    under: false, 
                    anchorPoint: {x: 8, y:2}
                },
            weapon_config: {
                sprite: new Feber().getSprite(), 
                under: false, 
                anchorPoint: {x: 12, y:1},
                name: "SWORD_FEDER"
            },
            spriteData: RIGHT_ARM,
            anchor: {x: 4, y: 1}
        },
        leftArm: {
            sleave: false, 
            guard: false,
            albow: true,
            glove: true,
            sleave_config: 
                {   sprite: new Sprite([], LEFT_ARM_SLEAVE, {x: 0, y: 0}, true), 
                    under: false, 
                    anchorPoint: {x: 0, y:0}
                }, 
            guard_config: 
                {   sprite: new Sprite([], LEFT_ARM_GUARD, {x: 0, y: 0}, false), 
                    under: false, 
                    anchorPoint: {x: 2, y:4}
                },
            albow_config: 
                {   sprite: new Sprite([], LEFT_ARM_ALBOW, {x: 0, y: 0}, false), 
                    under: false, 
                    anchorPoint: {x: 6, y:4}
                },
            glove_config: 
                {   sprite: new Sprite([], LEFT_ARM_GLOVE, {x: 0, y: 0}, false), 
                    under: false, 
                    anchorPoint: {x: 0, y:4}
                },
            spriteData: LEFT_ARM,
            anchor: {x: 4, y: 1}
        },
        colors: {
            primaryColor: Color.AROS_GREEN,
            secondaryColor: Color.RED,
            thirdColor: Color.WHITE
        },
        head: {
            helmet: false, 
            cross: false,
            helmet_config: 
                {   sprite: new Sprite([], HEAD_HELMET, {x: 0, y: 0}, false), 
                    under: false, 
                    anchorPoint: {x: 0, y:0}
                }, 
            cross_config: 
                {   sprite: new Sprite([], HEAD_CROSS, {x: 0, y: 0}, true), 
                    under: false, 
                    anchorPoint: {x: 7, y: 2}
                },
            spriteData: HEAD,
            anchor: {x: 8, y: 1}
        },
        torso: {
            cross: false,
            cross_config: 
                {   sprite: new Sprite([], TORSO_CROSS, {x: 0, y: 0}, true), 
                    under: false, 
                    anchorPoint: {x: 0, y:0}
                },
            spriteData: TORSO,
            anchor: {x: 8, y: 1}
        },
        waist: {
            spriteData: WAIST,
            anchor: {x: 8, y: 0}
        },
        rightLeg: {
            spriteData: RIGHT_LEG,
            anchor: {x: 3, y: 0}
        },
        leftLeg: {
            spriteData: LEFT_LEG,
            anchor: {x: 3, y: 0}
        }
    };
}

export const PLAYER = new Character(playerConfig());

export function basicEnemyConfig(): CharacterConfig {
    return {
        rightArm: {
            sleave: false, 
            guard: false,
            albow: false,
            glove: false,
            weapon: true,
            sleave_config: 
                {   sprite: new Sprite([], RIGHT_ARM_SLEAVE, {x: 0, y: 0}, true), 
                    under: false, 
                    anchorPoint: {x: 0, y:0}
                }, 
            guard_config: 
                {   sprite: new Sprite([], RIGHT_ARM_GUARD, {x: 0, y: 0}, false), 
                    under: false, 
                    anchorPoint: {x: 5, y:6}
                },
            albow_config: 
                {   sprite: new Sprite([], RIGHT_ARM_ALBOW, {x: 0, y: 0}, false), 
                    under: false, 
                    anchorPoint: {x: 3, y:5}
                },
            glove_config: 
                {   sprite: new Sprite([], RIGHT_ARM_GLOVE, {x: 0, y: 0}, false), 
                    under: false, 
                    anchorPoint: {x: 8, y:2}
                },
            weapon_config: {
                sprite: new Feber().getSprite(), 
                under: false, 
                anchorPoint: {x: 12, y:1},
                name: "SWORD_FEDER"
            },
            spriteData: RIGHT_ARM,
            anchor: {x: 4, y: 1}
        },
        leftArm: {
            sleave: false, 
            guard: false,
            albow: false,
            glove: false,
            sleave_config: 
                {   sprite: new Sprite([], LEFT_ARM_SLEAVE, {x: 0, y: 0}, true), 
                    under: false, 
                    anchorPoint: {x: 0, y:0}
                }, 
            guard_config: 
                {   sprite: new Sprite([], LEFT_ARM_GUARD, {x: 0, y: 0}, false), 
                    under: false, 
                    anchorPoint: {x: 2, y:4}
                },
            albow_config: 
                {   sprite: new Sprite([], LEFT_ARM_ALBOW, {x: 0, y: 0}, false), 
                    under: false, 
                    anchorPoint: {x: 6, y:4}
                },
            glove_config: 
                {   sprite: new Sprite([], LEFT_ARM_GLOVE, {x: 0, y: 0}, false), 
                    under: false, 
                    anchorPoint: {x: 0, y:4}
                },
            spriteData: LEFT_ARM,
            anchor: {x: 4, y: 1}
        },
        colors: {
            primaryColor: Color.BLACK,
            secondaryColor: Color.RED,
            thirdColor: Color.AROS_GREEN
        },
        head: {
            helmet: true, 
            cross: true,
            helmet_config: 
                {   sprite: new Sprite([], HEAD_HELMET, {x: 0, y: 0}, false), 
                    under: false, 
                    anchorPoint: {x: 0, y:0}
                }, 
            cross_config: 
                {   sprite: new Sprite([], HEAD_CROSS, {x: 0, y: 0}, true), 
                    under: false, 
                    anchorPoint: {x: 7, y: 2}
                },
            spriteData: HEAD,
            anchor: {x: 8, y: 1}
        },
        torso: {
            cross: false,
            cross_config: 
                {   sprite: new Sprite([], TORSO_CROSS, {x: 0, y: 0}, true), 
                    under: false, 
                    anchorPoint: {x: 0, y:0}
                },
            spriteData: TORSO,
            anchor: {x: 8, y: 1}
        },
        waist: {
            spriteData: WAIST,
            anchor: {x: 8, y: 0}
        },
        rightLeg: {
            spriteData: RIGHT_LEG,
            anchor: {x: 3, y: 0}
        },
        leftLeg: {
            spriteData: LEFT_LEG,
            anchor: {x: 3, y: 0}
        }
    };
}

export const BASIC_ENEMY = new Character(basicEnemyConfig());