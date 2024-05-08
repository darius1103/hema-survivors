import { SpriteFrame } from "./sprite-frame";

export class SpriteV1 {
    frames: SpriteFrame[] = [];
    constructor(frames: SpriteFrame[]) {
        this.frames = frames;
    }
}