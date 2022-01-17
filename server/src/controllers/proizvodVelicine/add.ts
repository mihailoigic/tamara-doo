import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';
import {ProizvodVelicina} from "../../typeorm/entities/VelicineProizvod";

export const add = async (req: Request, res: Response, next: NextFunction) => {
    const ProizvodVelicinaRepository = getRepository(ProizvodVelicina);
    const proizvodVelicina = new ProizvodVelicina();
    proizvodVelicina.forVelicinaId = Number(req.body.propertyId);
    proizvodVelicina.forProizvodId = Number(req.body.proizvodId);

    try {
        const proizvodVelicinaSaved = await ProizvodVelicinaRepository.save(proizvodVelicina);
        res.customSuccess(200, 'Proizvod velicina added.', { code: 0, id: proizvodVelicinaSaved.id});
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't add Proizvod velicine.`, null, err);
        return next(customError);
    }
};
