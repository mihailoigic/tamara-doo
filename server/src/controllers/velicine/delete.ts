import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { VelicineSifrarnik } from '../../typeorm/entities/Velicine';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const velicineSifrarnikRepository = getRepository(VelicineSifrarnik);
    try {
        velicineSifrarnikRepository.delete(id);
        res.customSuccess(200, 'Success.', { code: 0, message: `Velicina id: ${id} successfully deleted.`});
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
