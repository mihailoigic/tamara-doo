export interface IProduct {
    id: number;
    brend: string;
    naziv: string;
    // kategorija: {
    //     kategorija: string;
    //     tip: string;
    //     podtip: string;
    // }
    opis: string;
    rod: string;
    novo: boolean;
    moda: boolean;
    cena: number;
    defaultSlika: string;
    slike: string[];
    velicine: string[];
    boje: string[];
}