import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';

import { VelicineSifrarnik } from '../../typeorm/entities/Velicine';

export const add = async (req: Request, res: Response, next: NextFunction) => {
    const velicineSifrarnikRepository = getRepository(VelicineSifrarnik);
    const velicina = new VelicineSifrarnik();
    velicina.naziv = req.body.naziv;

    try {
        const velicinaSaved = await velicineSifrarnikRepository.save(velicina);
        res.customSuccess(200, 'Velicina added.', { code: 0, id: velicinaSaved.id});
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of users.`, null, err);
        return next(customError);
    }
};
