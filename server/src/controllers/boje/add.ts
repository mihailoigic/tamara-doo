import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';

import { BojaSifrarnik } from '../../typeorm/entities/Boje';

export const add = async (req: Request, res: Response, next: NextFunction) => {
    const bojaSifrarnikRepository = getRepository(BojaSifrarnik);
    const boja = new BojaSifrarnik();
    boja.naziv = req.body.naziv;

    try {
        const bojaSaved = await bojaSifrarnikRepository.save(boja);
        res.customSuccess(200, 'boja added.', { code: 0, id: bojaSaved.id});
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of colors.`, null, err);
        return next(customError);
    }
};
