import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';

import { TipSifrarnik } from '../../typeorm/entities/Tip';

export const list = async (req: Request, res: Response, next: NextFunction) => {
    const tipSifrarnikRepository = getRepository(TipSifrarnik);
    try {
        const tipovi = await tipSifrarnikRepository.find();
        res.customSuccess(200, 'List of types.', tipovi);
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of types.`, null, err);
        return next(customError);
    }
};
