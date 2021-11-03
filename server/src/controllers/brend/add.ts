import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';

import { BrendSifrarnik } from '../../typeorm/entities/Brend';

export const add = async (req: Request, res: Response, next: NextFunction) => {
    const brendSifrarnikRepository = getRepository(BrendSifrarnik);
    const brend = new BrendSifrarnik();
    brend.naziv = req.body.naziv;

    try {
        const brendSaved = await brendSifrarnikRepository.save(brend);
        res.customSuccess(200, 'boja added.', { code: 0, id: brendSaved.id});
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of brands.`, null, err);
        return next(customError);
    }
};
