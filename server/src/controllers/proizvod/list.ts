import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Proizvod } from '../../typeorm/entities/Proizvod';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const proizvodRepository = getRepository(Proizvod);

  const proizvodData = await getRepository(Proizvod)
    .createQueryBuilder('proizvod')
    .innerJoinAndSelect('proizvod.proizvodBoja', 'boje')
    .innerJoinAndSelect('boje.forBojaSifrarnik', 'bojeNaziv')
    // .innerJoinAndSelect('proizvod.proizvodBrend', 'brend')
    // .innerJoinAndSelect('brend.forBrendSifranik', 'brendNaziv')
    // .innerJoinAndSelect('prozivod.proizvodVelicine', 'velicine')
    // .innerJoinAndSelect('velicine.forVelicineSifrarnik', 'velicineNaziv')
    .getMany();

  const returnObject = makeResponseData(proizvodData);
  try {
    const proizvod = await proizvodRepository.find();
    res.customSuccess(200, 'List of subtypes.', returnObject);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of subtypes.`, null, err);
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
    naziv: item.naziv,
    opis: item.opis,
    proizvodBoje: getBoje(item),
  };
};

interface proizvodResponseModel {
  id: number;
  naziv: string;
  opis: string;
  proizvodBoje: string[];
  // proizvodKategorije: string[];
}

const getBoje = (proizvod: Proizvod): string[] => {
  return proizvod.proizvodBoja.map((prozivodBoja) => prozivodBoja.forBojaSifrarnik.naziv);
};
