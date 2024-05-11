import { CharacterMovementConfig } from "../common/character-movement-config";

export class MovementPlayer {
    private config: CharacterMovementConfig;

    constructor(config: CharacterMovementConfig) {
        this.config = config;
    }
}