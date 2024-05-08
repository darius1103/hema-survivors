import { LegConfig } from "../../common/leg-config";
import { Sprite } from "../../display/sprite";
import { Component } from "../component";

export class Leg extends Component {
    constructor(config: LegConfig) {
        super();
        const segments = [];
        if (config?.sleave && config?.sleave_config) {
            segments.push(config.sleave_config);
        }
        if (config?.guard && config?.guard_config) {
            segments.push(config.guard_config);
        }
        if (config?.knee && config?.knee_config) {
            segments.push(config.knee_config);
        }
        if (config?.shoe && config?.shoe_config) {
            segments.push(config.shoe_config);
        }
        this.sprite = new Sprite(segments, config.spriteData, config.anchor, true);
    }
}