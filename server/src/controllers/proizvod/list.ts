import {Request, Response, NextFunction} from 'express';
import {getRepository} from 'typeorm';

import {Proizvod} from '../../typeorm/entities/Proizvod';
import {CustomError} from '../../utils/response/custom-error/CustomError';

const COUNT = 20;

export const list = async (req: Request, res: Response, next: NextFunction) => {
    const {start, searchTerm = null, pol, tip, kategorija} = req.query;
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
            .innerJoinAndSelect('kategorijaTipPodTip.forTipSifrarnik', 'tipNaziv')
            .innerJoinAndSelect('kategorijaTipPodTip.forPodtipSifrarnik', 'podtipNaziv')
            .skip(Number(start) - 1)
            .take(COUNT)
            .andWhere(searchTerm ? `proizvod.naziv ILike '%${searchTerm}%'` : 'TRUE')
            .andWhere(pol ? `proizvod.rod = ${ePol[pol.toString()]}` : 'TRUE')
            .andWhere(filters?.boje ? `bojeNaziv.id in (${filters.boje})` : 'TRUE')
            .andWhere(filters?.brend ? `brendNaziv.id in (${filters.brend})` : 'TRUE')
            .andWhere(kategorija ? `kategorijaTipPodTip.forKategorija = ${Number(kategorija)}` : 'TRUE')
            .andWhere(tip ? `kategorijaTipPodTip.forTip = ${Number(tip)}` : 'TRUE')
            .getManyAndCount();

        const returnObject = {proizvodi: makeResponseData(proizvodData[0]), total: proizvodData[1]};
        res.customSuccess(200, 'List of products.', returnObject);
    } catch (err) {
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

const makeSingleResponseItem = (item: Proizvod): proizvodResponseModel => {
    return <proizvodResponseModel>{
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
        tip: item.kategorijaTipPodtip[0]?.forTipSifrarnik.naziv,
        podtip: getPodtip(item),
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
        case 2:
            return 'muški';
        case 3:
            return 'unisex';
        default:
            return 'ženski';
    }
};

const getPodtip = (proizvod: Proizvod): string[] => {
    return proizvod.kategorijaTipPodtip?.map((proizvodPodtip) => proizvodPodtip.forPodtipSifrarnik.naziv);
};

enum ePol {
    'zenski' = 1,
    'muski' = 2,
    'unisex' = 3,
}
