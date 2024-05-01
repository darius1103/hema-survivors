import { Arm } from "./arm";
import { Chest } from "./chest";
import { Head } from "./head";
import { LeftLeg } from "./left-leg";
import { Leg } from "./Leg";
import { MainHand } from "./main-hand";
import { OffHand } from "./off-hand";
import { RightLeg } from "./right-leg";
import { Waist } from "./waist";

export class Fighter{
    public head: Head = new Head();
    public arms: Arm[] = [new MainHand(), new OffHand()];
    public chest: Chest = new Chest();
    public waist: Waist = new Waist();
    public legs: Leg[]= [new RightLeg(), new LeftLeg()];

    constructor() {

    }
}