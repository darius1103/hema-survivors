import { Color } from "../../utils/color";
import { ArmConfig } from "./arm-config";
import { AttackConfig } from "./attack-config";
import { HeadConfig } from "./head-config";
import { HealthBarConfig } from "./health-bar-config";
import { LegConfig } from "./leg-config";
import { TorsoConfig } from "./torso-config";
import { WaistConfig } from "./waist-config";

export interface CharacterConfig {
    attack: AttackConfig,
    rightArm: ArmConfig,
    leftArm: ArmConfig,
    colors?: {
        primaryColor: Color,
        secondaryColor: Color,
        thirdColor: Color,
    }
    head: HeadConfig,
    torso: TorsoConfig,
    waist: WaistConfig,
    rightLeg: LegConfig,
    leftLeg: LegConfig,
    healthBar?: HealthBarConfig,
}