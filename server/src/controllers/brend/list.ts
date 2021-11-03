import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';

import { BrendSifrarnik } from '../../typeorm/entities/Brend';

export const list = async (req: Request, res: Response, next: NextFunction) => {
    const brendSifrarnikRepository = getRepository(BrendSifrarnik);
    try {
        const brendovi = await brendSifrarnikRepository.find();
        res.customSuccess(200, 'List of brands.', brendovi);
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of brands.`, null, err);
        return next(customError);
    }
};
