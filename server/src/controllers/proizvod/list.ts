import {Request, Response, NextFunction} from 'express';
import {getRepository} from 'typeorm';

import {Proizvod} from '../../typeorm/entities/Proizvod';
import {CustomError} from '../../utils/response/custom-error/CustomError';
import {Discount} from "../../typeorm/entities/Discount";
import {DiscountOne} from "../../typeorm/entities/DiscountOne";

const COUNT = 20;

export const list = async (req: Request, res: Response, next: NextFunction) => {
    const {start, searchTerm = null, pol, tip, kategorija, count = 20} = req.query;
    const filters = req.query.filters ? JSON.parse(req.query.filters.toString()) : null;

    try {
        const proizvodData = await getRepository(Proizvod)
            .createQueryBuilder('proizvod')
            .innerJoinAndSelect('proizvod.proizvodBoja', 'boje')
            .innerJoinAndSelect('boje.forBojaSifrarnik', 'bojeNaziv')
            .innerJoinAndSelect('proizvod.proizvodVelicina', 'velicina')
            .innerJoinAndSelect('velicina.forVelicinaSifrarnik', 'velicinaNaziv')
            .innerJoinAndSelect('proizvod.proizvodBrend', 'brend')
            .innerJoinAndSelect('brend.forBrendSifrarnik', 'brendNaziv')
            .innerJoinAndSelect('proizvod.proizvodSlike', 'slike')
            .innerJoinAndSelect('proizvod.kategorijaTipPodtip', 'kategorijaTipPodTip')
            .innerJoinAndSelect('kategorijaTipPodTip.forKategorijaSifrarnik', 'kategorijaNaziv')
            .leftJoinAndSelect('kategorijaTipPodTip.forTipSifrarnik', 'tipNaziv')
            .leftJoinAndSelect('kategorijaTipPodTip.forPodtipSifrarnik', 'podtipNaziv')
            .leftJoinAndSelect('proizvod.discountOne', 'discountOne')
            .skip(Number(start) - 1)
            .take(Number(count))
            .andWhere(searchTerm ? `proizvod.naziv ILike '%${searchTerm}%'` : 'TRUE')
            .andWhere(pol ? `proizvod.rod = ${ePol[pol.toString()]}` : 'TRUE')
            .andWhere(filters?.boje ? `bojeNaziv.id in (${filters.boje})` : 'TRUE')
            .andWhere(filters?.brend ? `brendNaziv.id in (${filters.brend})` : 'TRUE')
            .andWhere(kategorija ? `kategorijaTipPodTip.forKategorija = ${Number(kategorija)}` : 'TRUE')
            .andWhere(tip ? `kategorijaTipPodTip.forTip = ${Number(tip)}` : 'TRUE')
            .getManyAndCount();

        const discounts = await getRepository(Discount)
            .createQueryBuilder('discount')
            .leftJoinAndSelect('discount.boje', 'boje')
            .leftJoinAndSelect('boje.forBojaSifrarnik', 'bojeNaziv')
            .leftJoinAndSelect('discount.brendovi', 'brendovi')
            .leftJoinAndSelect('brendovi.forBrendSifrarnik', 'brendoviNaziv')
            .leftJoinAndSelect('discount.kategorije', 'kategorije')
            .leftJoinAndSelect('kategorije.forKategorijaSifrarnik', 'kategorijeNaziv')
            .where(`discount.datumdo > now() and discount.datumod < now()`)
            .getMany();

        const proizvodi = makeResponseData(proizvodData[0]);
        for (const proizvod of proizvodi) {
            proizvod.discounts = await attachDiscounts(discounts, proizvod);
        }
        const returnObject = {proizvodi: proizvodi, total: proizvodData[1]};
        res.customSuccess(200, 'List of products.', returnObject);
    } catch (err) {
        console.log(err);
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of products.`, null, err);
        return next(customError);
    }
};

const makeResponseData = (items: Proizvod[]): proizvodResponseModel[] => {
    const responseArray: proizvodResponseModel[] = [];
    for (const item of items) {
        responseArray.push(makeSingleResponseItem(item));
    }

    return responseArray;
};

const attachDiscounts = async (discounts: Discount[], proizvod: proizvodResponseModel): Promise<DiscountResponseModel[]> => {
    const discountsForProizvod: DiscountResponseModel[] = [];
    // @ts-ignore
    for (const discount of discounts) {
        // if (discount.boje.length > 0) {
        // proizvod.boje.forEach(boja => {
        //   const item = discount.boje.find(item => item.forBojaSifrarnik.naziv === boja);
        //   if (!item) {
        //     return [];
        //   }
        // })
        // }
        let push = true;
        if (discount.brendovi.length > 0) {
            const brend = await discount.brendovi.find(item => item.forBrendSifrarnik.naziv === proizvod.brend);
            if (!brend) {
                push = false;
            }
        }
        if (discount.kategorije.length > 0) {
            const kat = await discount.kategorije.find(item => item.forKategorijaSifrarnik.naziv === proizvod.kategorija);
            if (!kat) {
                push = false;
            }
        }
        if (push) {
            const disc = <DiscountResponseModel>{
                id: discount.id,
                naziv: discount.naziv,
                procenat: discount.procenat,
                datumOd: discount.datumOd,
                datumDo: discount.datumDo
            };
            discountsForProizvod.push(disc);
        }
    }
    return discountsForProizvod;
}

const makeSingleResponseItem = (item: Proizvod): proizvodResponseModel => {
    return <proizvodResponseModel><unknown>{
        id: item.id,
        brend: item.proizvodBrend.forBrendSifrarnik.naziv,
        naziv: item.naziv,
        opis: item.opis,
        boje: getBoje(item),
        velicine: getVelicine(item),
        defaultSlika: item.defaultSlika,
        slike: getSlike(item),
        novo: item.novo,
        moda: item.moda,
        rod: getRod(item),
        kategorija: item.kategorijaTipPodtip[0]?.forKategorijaSifrarnik.naziv,
        tip: item.kategorijaTipPodtip[0]?.forTipSifrarnik?.naziv,
        podtip: getPodtip(item),
        discountOne: item.discountOne,
    };
};

interface proizvodResponseModel {
    id: number;
    brend: string;
    naziv: string;
    opis: string;
    boje: string[];
    velicine: string[];
    defaultSlika: string;
    slike: string[];
    novo: boolean;
    moda: boolean;
    rod: string;
    kategorija: string;
    tip: string | null;
    podtip: string[] | null;
    discounts?: DiscountResponseModel[];
    discountOne?: DiscountOne;
}

interface DiscountResponseModel {
    id: number;
    naziv: string;
    procenat: number;
    datumOd: Date;
    datumDo: Date;
}

const getBoje = (proizvod: Proizvod): string[] => {
    return proizvod.proizvodBoja.map((prozivodBoja) => prozivodBoja.forBojaSifrarnik.naziv);
};

const getVelicine = (proizvod: Proizvod): string[] => {
    return proizvod.proizvodVelicina.map((proizvodVelicina) => proizvodVelicina.forVelicinaSifrarnik.naziv);
};

const getSlike = (proizvod: Proizvod): string[] => {
    return proizvod.proizvodSlike.map((proizvodSlike) => proizvodSlike.urlSlike);
};

const getRod = (proizvod: Proizvod): string => {
    switch (proizvod.rod) {
        case 1:
            return 'ženski';
        case 0:
            return 'muški';
        case 3:
            return 'unisex';
        default:
            return 'ženski';
    }
};

const getPodtip = (proizvod: Proizvod): string[] => {
    return proizvod.kategorijaTipPodtip?.map((proizvodPodtip) => proizvodPodtip.forPodtipSifrarnik?.naziv);
};

enum ePol {
    'zenski' = 1,
    'muski' = 0,
    'unisex' = 2,
}
