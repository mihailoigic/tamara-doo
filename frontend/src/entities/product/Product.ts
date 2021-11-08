import { IProduct } from "./types";

export default class Product implements IProduct {

    public id: number;
    public brend: string;
    public naziv: string;
    public kategorija: {
        kategorija: string;
        tip: string;
        podtip: string;
    }
    public opis: string;
    public rod: string;
    public novo: boolean;
    public moda: boolean;
    public cena: number;
    public defaultSlika: string;
    public slike: string[];
    public velicine: string[];
    public boje: string[];

    constructor(
        id: number,
        brend: string,
        naziv: string,
        kategorija: { kategorija: string; tip: string; podtip: string },
        opis: string,
        rod: string,
        novo: boolean,
        moda: boolean,
        cena: number,
        defaultSlika: string,
        slike: string[],
        velicine: string[],
        boje: string[],
    ) {
        this.id = id;
        this.brend = brend;
        this.naziv = naziv;
        this.kategorija = kategorija;
        this.opis = opis;
        this.rod = rod;
        this.novo = novo;
        this.moda = moda;
        this.cena = cena;
        this.defaultSlika = defaultSlika;
        this.slike = slike;
        this.velicine = velicine;
        this.boje = boje;
    }
}
