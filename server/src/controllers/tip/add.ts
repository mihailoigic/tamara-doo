import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';

import { TipSifrarnik } from '../../typeorm/entities/Tip';

export const add = async (req: Request, res: Response, next: NextFunction) => {
    const tipSifrarnikRepository = getRepository(TipSifrarnik);
    const tip = new TipSifrarnik();
    tip.naziv = req.body.naziv;

    try {
        const tipSaved = await tipSifrarnikRepository.save(tip);
        res.customSuccess(200, 'Type added.', { code: 0, id: tipSaved.id});
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of types.`, null, err);
        return next(customError);
    }
};
