import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';

import { VelicineSifrarnik } from '../../typeorm/entities/Velicine';

export const list = async (req: Request, res: Response, next: NextFunction) => {
    const velicineSifrarnikRepository = getRepository(VelicineSifrarnik);
    try {
        const users = await velicineSifrarnikRepository.find();
        res.customSuccess(200, 'List of users.', users);
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of users.`, null, err);
        return next(customError);
    }
};
