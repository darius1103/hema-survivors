import { EventsStreams } from "../../utils/events-streams";
import { CharacterDisplay } from "../display/characters/character-display";
import { Box } from "./box";

export interface CharacterControlConfig {
    combinedDataLTR?: CharacterDisplay,
    combinedDataRTL?: CharacterDisplay,
    attackBoxesLTR?: Box[],
    attackBoxesRTL?: Box[],
    adjustedAttackBox?: Box[],
    lastAttack?: number,
    attackDelay?: number,
    eventStreams?: EventsStreams,
}