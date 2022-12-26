import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Proizvod } from '../../typeorm/entities/Proizvod';
import { CustomError } from '../../utils/response/custom-error/CustomError';
import {Discount} from "../../typeorm/entities/Discount";
import {DiscountOne} from "../../typeorm/entities/DiscountOne";

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const proizvodSingle = await getRepository(Proizvod)
      .createQueryBuilder('proizvod')
      .leftJoinAndSelect('proizvod.proizvodBoja', 'boje')
      .leftJoinAndSelect('boje.forBojaSifrarnik', 'bojeNaziv')
      .leftJoinAndSelect('proizvod.proizvodVelicina', 'velicina')
      .leftJoinAndSelect('velicina.forVelicinaSifrarnik', 'velicinaNaziv')
      .leftJoinAndSelect('proizvod.proizvodBrend', 'brend')
      .leftJoinAndSelect('brend.forBrendSifrarnik', 'brendNaziv')
      .leftJoinAndSelect('proizvod.proizvodSlike', 'slike')
      .leftJoinAndSelect('proizvod.kategorijaTipPodtip', 'kategorijaTipPodTip')
      .leftJoinAndSelect('kategorijaTipPodTip.forKategorijaSifrarnik', 'kategorijaNaziv')
      .leftJoinAndSelect('kategorijaTipPodTip.forTipSifrarnik', 'tipNaziv')
      .leftJoinAndSelect('kategorijaTipPodTip.forPodtipSifrarnik', 'podtipNaziv')
        .leftJoinAndSelect('proizvod.discountOne', 'discountOne')
      .where(`proizvod.id = ${id}`)
      .getOne();

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


    if(!proizvodSingle){
      const customError = new CustomError(400, 'Raw', `Can't proizvod.`, null);
      return next(customError);
    }

    const returnObject = makeSingleResponseItem(proizvodSingle);
    returnObject.discounts = await attachDiscounts(discounts, returnObject);
    res.customSuccess(200, 'List of products.', returnObject);
  } catch (err) {
    console.log(err)
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of products.`, null, err);
    return next(customError);
  }
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
    brend: item.proizvodBrend?.forBrendSifrarnik.naziv,
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
    cena: item.cena,
    discountOne: item.discountOne
  };
};

interface DiscountResponseModel {
  id: number;
  naziv: string;
  procenat: number;
  datumOd: Date;
  datumDo: Date;
}

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
  tip: string;
  podtip: string[];
  discounts?: DiscountResponseModel[];
  discountOne?: DiscountOne;
  // proizvodKategorije: string[];
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
    default:
      return 'ženski';
  }
};

const getPodtip = (proizvod: Proizvod): string[] => {
  return proizvod.kategorijaTipPodtip?.map((proizvodPodtip) => proizvodPodtip.forPodtipSifrarnik?.naziv);
};
