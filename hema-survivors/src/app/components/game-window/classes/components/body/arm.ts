import { ArmConfig } from "../../common/arm-config";
import { Sprite } from "../../display/sprite";
import { Component } from "../component";

export class Arm extends Component {
    constructor(config: ArmConfig) {
        super();
        const segments = [];
        if (config?.weapon && config?.weapon_config) {
            segments.push(config.weapon_config);
        }
        if (config?.sleave && config?.sleave_config) {
            segments.push(config.sleave_config);
        }
        if (config?.guard && config?.guard_config) {
            segments.push(config.guard_config);
        }
        if (config?.albow && config?.albow_config) {
            segments.push(config.albow_config);
        }
        if (config?.glove && config?.glove_config) {
            segments.push(config.glove_config);
        }
        this.sprite = new Sprite(segments, config.spriteData, config.anchor, false);
    }
}