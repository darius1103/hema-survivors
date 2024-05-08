import { Sprite } from "../display/sprite";

export abstract class Component {
    protected sprite: Sprite | null = null;
    
    constructor() {
    }

    public getSprite(): Sprite {
        return this.sprite as any;
    }
}