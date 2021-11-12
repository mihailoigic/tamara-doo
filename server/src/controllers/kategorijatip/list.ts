import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import kategorijatip from '../../routes/v1/kategorijatip';
import { KategorijaTip } from '../../typeorm/entities/KategorijaTip';
import { KategorijeSifrarnik } from '../../typeorm/entities/Kategorije';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const { pol } = req.query;
  try {
    const kategorijaTipList = await getRepository(KategorijeSifrarnik)
      .createQueryBuilder('kategorija')
      .innerJoinAndSelect('kategorija.kategorijaTip', 'kategorijaTip')
      .innerJoinAndSelect('kategorijaTip.forTipSifrarnik', 'tipNaziv')
      .where(pol ? `kategorijaTip.pol = ${Boolean(ePol[pol.toString()])}` : 'kategorijaTip.pol = null')
      .getMany();

    console.log(kategorijaTipList);

    res.customSuccess(200, 'List of kategorija tip.', makeResponseData(kategorijaTipList));
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of brands.`, null, err);
    return next(customError);
  }
};

const makeResponseData = (items: KategorijeSifrarnik[]): kategorijaTipResponseModel[] => {
  const responseArray: kategorijaTipResponseModel[] = [];
  for (const item of items) {
    responseArray.push(makeSingleResponseItem(item));
  }

  return responseArray;
};

const makeSingleResponseItem = (item: KategorijeSifrarnik): kategorijaTipResponseModel => {
  return <kategorijaTipResponseModel>{
    id: item.id,
    kategorija: item.naziv,
    tip: getTip(item.kategorijaTip),
  };
};

interface kategorijaTipResponseModel {
  id: number;
  kategorija: string;
  tip: tipModel[];
}

interface tipModel {
  id: number;
  naziv: string;
}

const getTip = (kategorijaTip: KategorijaTip[]): tipModel[] => {
  return kategorijaTip.map((kategorijaTip) => {
    return <tipModel>{
      id: kategorijaTip.forTipSifrarnik.id,
      naziv: kategorijaTip.forTipSifrarnik.naziv
    };
  });
};

enum ePol {
  'zenski' = 1,
  'muski' = 0,
}
