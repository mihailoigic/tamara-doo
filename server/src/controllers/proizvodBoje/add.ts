import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';
import {ProizvodBoja} from "../../typeorm/entities/BojeProizvod";

export const add = async (req: Request, res: Response, next: NextFunction) => {
    const ProizvodBojaRepository = getRepository(ProizvodBoja);
    const proizvodBoja = new ProizvodBoja();
    proizvodBoja.forBojaId = Number(req.body.propertyId);
    proizvodBoja.forProizvodId = Number(req.body.proizvodId);

    try {
        const proizvodBojaSaved = await ProizvodBojaRepository.save(proizvodBoja);
        res.customSuccess(200, 'Proizvod boja added.', { code: 0, id: proizvodBojaSaved.id});
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't add Proizvod boja.`, null, err);
        return next(customError);
    }
};
