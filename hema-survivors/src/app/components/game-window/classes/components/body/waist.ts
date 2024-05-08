import { WaistConfig } from "../../common/waist-config";
import { Sprite } from "../../display/sprite";
import { Component } from "../component";

export class Waist extends Component {
    constructor(config: WaistConfig) {
        super();
        const segments = [];
        if (config?.dagger && config?.dagger_config) {
            segments.push(config.dagger_config);
        }
        this.sprite = new Sprite(segments, config.spriteData, config.anchor, true);
    }
}