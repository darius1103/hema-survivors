import { Color } from "./color";

export const codeToColor =  new Map<number, string>();
codeToColor.set(1, Color.YELLOW);
codeToColor.set(2, Color.BLACK);
codeToColor.set(3, Color.RED);
codeToColor.set(4, Color.ORANGE);
codeToColor.set(6, Color.BLUE);
codeToColor.set(7, Color.LIGHT_SKIN);
codeToColor.set(8, Color.BROWN);
codeToColor.set(9, Color.DARK_GREY);
codeToColor.set(10, Color.BLUE);
codeToColor.set(5, Color.AROS_GREEN);
codeToColor.set(11, Color.LIGHT_BLUE);
codeToColor.set(12, Color.WHITE);

export const colorToCode =  new Map<string, number>();
codeToColor.forEach((value: string, key: number) => colorToCode.set(value, key));