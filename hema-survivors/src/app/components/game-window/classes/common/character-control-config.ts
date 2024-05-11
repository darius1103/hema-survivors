import { EventsStreams } from "../../utils/events-streams";
import { CharacterDisplay } from "../display/characters/character-display";
import { AttackConfig } from "./attack-config";
import { HealthConfig } from "./health-config";

export interface CharacterControlConfig {
    attack: AttackConfig,
    combinedDataLTR: CharacterDisplay,
    combinedDataRTL: CharacterDisplay,
    events$: EventsStreams,
    health: HealthConfig
}