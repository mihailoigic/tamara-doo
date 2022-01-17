import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';
import {ProizvodBrend} from "../../typeorm/entities/BrendProizvod";

export const add = async (req: Request, res: Response, next: NextFunction) => {
    const ProizvodBrendRepository = getRepository(ProizvodBrend);
    const proizvodBrend = new ProizvodBrend();
    proizvodBrend.forBrendId = Number(req.body.propertyId);
    proizvodBrend.forProizvodId = Number(req.body.proizvodId);

    try {
        const proizvodBrendSaved = await ProizvodBrendRepository.save(proizvodBrend);
        res.customSuccess(200, 'Proizvod brend added.', { code: 0, id: proizvodBrendSaved.id});
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't add Proizvod brend.`, null, err);
        return next(customError);
    }
};
