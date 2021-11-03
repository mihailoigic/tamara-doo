import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';

import { KategorijeSifrarnik } from '../../typeorm/entities/Kategorije';

export const add = async (req: Request, res: Response, next: NextFunction) => {
    const kategorijeSifrarnikRepository = getRepository(KategorijeSifrarnik);
    const kategorije = new KategorijeSifrarnik();
    kategorije.naziv = req.body.naziv;

    try {
        const kategorijeSaved = await kategorijeSifrarnikRepository.save(kategorije);
        res.customSuccess(200, 'Category added.', { code: 0, id: kategorijeSaved.id});
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of categories.`, null, err);
        return next(customError);
    }
};
