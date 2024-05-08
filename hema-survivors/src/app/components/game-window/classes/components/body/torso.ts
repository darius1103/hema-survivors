import { TorsoConfig } from "../../common/torso-config";
import { Sprite } from "../../display/sprite";
import { Component } from "../component";

export class Torso extends Component {
    constructor(config: TorsoConfig) {
        super();
        const segments = [];
        if (config?.cross && config?.cross_config) {
            segments.push(config.cross_config);
        }
        this.sprite = new Sprite(segments, config.spriteData, config.anchor, true);
    }
}