import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { TipSifrarnik } from '../../typeorm/entities/Tip';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const tipSifrarnikRepository = getRepository(TipSifrarnik);
    try {
        tipSifrarnikRepository.delete(id);
        res.customSuccess(200, 'Success.', { code: 0, message: `Type id: ${id} successfully deleted.`});
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
