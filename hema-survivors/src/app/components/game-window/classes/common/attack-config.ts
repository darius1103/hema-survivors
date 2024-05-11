import { Weapon } from "./weapon";

export interface AttackConfig {
    weapons: Weapon[],
    damageRangeMin: number,
    damageRangeMax: number
}