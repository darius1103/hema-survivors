import { SpriteHelper } from "../classes/display/sprite-helper";

export const PIXEL_SIZE = 2;
export const SPRITE_SIZE = 64;
export const MAX_ENEMIES = 2;
export const MAGIC_BOX_ALIGNMENT = 20;
export var DEBUG_MODE = false;
export const SPRITE_HELPER = new SpriteHelper();
export function toggleDebugMode(): void {
    DEBUG_MODE = !DEBUG_MODE;
}