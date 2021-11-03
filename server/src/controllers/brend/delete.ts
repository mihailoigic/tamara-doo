import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { BrendSifrarnik } from '../../typeorm/entities/Brend';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const brendSifrarnikRepository = getRepository(BrendSifrarnik);
    try {
        brendSifrarnikRepository.delete(id);
        res.customSuccess(200, 'Success.', { code: 0, message: `Brand id: ${id} successfully deleted.`});
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
