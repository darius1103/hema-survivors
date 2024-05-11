import { EventsStreams } from "../../utils/events-streams";
import { CharacterDisplay } from "../display/characters/character-display";
import { AttackConfig } from "./attack-config";

export interface CharacterControlConfig {
    attack: AttackConfig,
    combinedDataLTR: CharacterDisplay,
    combinedDataRTL: CharacterDisplay,
    eventStreams: EventsStreams,
}