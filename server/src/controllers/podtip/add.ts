import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';

import { PodtipSifrarnik } from '../../typeorm/entities/Podtip';

export const add = async (req: Request, res: Response, next: NextFunction) => {
    const podtipSifrarnikRepository = getRepository(PodtipSifrarnik);
    const podtip = new PodtipSifrarnik();
    podtip.naziv = req.body.naziv;

    try {
        const podtipSaved = await podtipSifrarnikRepository.save(podtip);
        res.customSuccess(200, 'subtype added.', { code: 0, id: podtipSaved.id});
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of subtypes.`, null, err);
        return next(customError);
    }
};
