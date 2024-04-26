import { SpriteFrame } from "./sprite-frame";

export class Sprite {
    frames: SpriteFrame[] = [];
    constructor(frames: SpriteFrame[]) {
        this.frames = frames;
    }
}