import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';
import {KategorijaTip} from "../../typeorm/entities/KategorijaTip";

export const add = async (req: Request, res: Response, next: NextFunction) => {
    const kategorijeTipRepository = getRepository(KategorijaTip);
    const kategorije = new KategorijaTip();
    kategorije.pol = returnPol(req.body.pol);
    kategorije.forKategorija = Number(req.body.kategorija);
    kategorije.forTip = Number(req.body.tip) ? Number(req.body.tip) : null;

    try {
        const kategorijeSaved = await kategorijeTipRepository.save(kategorije);
        res.customSuccess(200, 'Category added.', { code: 0, id: kategorijeSaved.id});
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't add category`, null, err);
        return next(customError);
    }
};

const returnPol = (pol: string): boolean => {
    switch (pol) {
        case 'zenski':
            return true;
        case 'muski':
            return false;
        default:
            return true;
    }
}

