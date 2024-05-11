import { Observable } from "rxjs";
import { EventsStreams } from "../utils/events-streams";
import { Character } from "./character";
import { Box } from "./common/box";
import { XY } from "./common/x-y";
import { basicFollow } from "./control/movement-npc";
import { CharacterDisplay } from "./display/characters/character-display";

export class Enemy extends Character  {
    private lastKnownPlayerLocation: XY = null as any;

    constructor(innitialLocation: XY, stream: Observable<XY>, characterDisplayRTL: CharacterDisplay, characterDisplayLTR: CharacterDisplay, id: string, events$: EventsStreams) {
        super(innitialLocation, characterDisplayRTL, characterDisplayLTR, id , events$);
        super.setSpeed(0.4);
        stream.subscribe((location) => {
            this.lastKnownPlayerLocation = location;
            this.controlStatus = basicFollow(this.absolutePosition, this.lastKnownPlayerLocation);
        });
    }

    public attemptAttack(attackBoxes: Box[], damage: number): void {
        // const gotHit = this.figther.attemptAttack(attackBoxes, damage, this.absolutePosition, this.facingRight);
        // if (gotHit) {
        //     this.events$.hit.next({
        //         text: damage.toString(),
        //         unit: this.figther,
        //         location: this.getAbsolutePositon()});
        //     this.currentHealth -= damage;
        //     if (this.currentHealth <= 0) {
        //         this.events$.death.next({
        //             id: this.id, 
        //             unit: this.figther});
        //     }
        // }
    }
}