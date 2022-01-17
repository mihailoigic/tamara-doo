import { ISifrarnik } from "./types";

export default class Sifrarnik implements ISifrarnik {

    public label: string;
    public value: number;

    constructor(
        label: string,
        value: number,
    ) {
        this.label = label;
        this.value = value;
    }
}
