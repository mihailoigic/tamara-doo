import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Proizvod } from '../../typeorm/entities/Proizvod';
import { CustomError } from '../../utils/response/custom-error/CustomError';

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
      .where(`proizvod.id = ${id}`)
      .getOne();

    if(!proizvodSingle){
      const customError = new CustomError(400, 'Raw', `Can't proizvod.`, null);
      return next(customError);
    }

    const returnObject = makeSingleResponseItem(proizvodSingle);
    res.customSuccess(200, 'List of products.', returnObject);
  } catch (err) {
    console.log(err)
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of products.`, null, err);
    return next(customError);
  }
};

const makeSingleResponseItem = (item: Proizvod): proizvodResponseModel => {
  return <proizvodResponseModel>{
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
    cena: item.cena
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
  tip: string;
  podtip: string[];
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
