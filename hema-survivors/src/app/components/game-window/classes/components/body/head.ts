import { HeadConfig } from "../../common/head-config";
import { Sprite } from "../../display/sprite";
import { Component } from "../component";

export class Head extends Component {
    constructor(config: HeadConfig) {
        super();
        const segments = [];
        if (config?.helmet && config?.helmet_config) {
            segments.push(config.helmet_config);
        }
        if (config?.cross && config?.cross_config) {
            segments.push(config.cross_config);
        }
        this.sprite = new Sprite(segments, config.spriteData, config.anchor, false);
    }
}