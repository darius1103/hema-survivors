import { TemporaryElement } from "./temporary-element";
import { XYLocation } from "./xylocation";

export class TemporaryText extends TemporaryElement{
    private message: string;
    private font: string;
    private color: string;

    constructor(lifetime: number, location: XYLocation, message: string, font: string, color: string) {
        super(lifetime, location);
        this.message = message;
        this.font = font;
        this.color = color;
    }

    public getMessage(): string {
        return this.message;
    }

    public getStyle(): string {
        return this.font;
    }

    public getColor(): string {
        return this.color;
    }
}