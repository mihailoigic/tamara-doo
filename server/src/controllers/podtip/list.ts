import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { PodtipSifrarnik } from '../../typeorm/entities/Podtip';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const podtipSifrarnikRepository = getRepository(PodtipSifrarnik);
  try {
    const podtip = await podtipSifrarnikRepository.find();
    res.customSuccess(200, 'List of subtypes.', podtip);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of subtypes.`, null, err);
    return next(customError);
  }
};
