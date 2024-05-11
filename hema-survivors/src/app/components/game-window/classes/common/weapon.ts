import { Box } from "./box";

export interface Weapon {
    attackBoxesLTR: Box[],
    attackBoxesRTL: Box[],
    damage: number,
    attackDelay: number,
    lastAttack: number,
    adjustedAttackBoxes: Box[],
}