import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';
import {ProizvodSlike} from "../../typeorm/entities/SlikeProizvod";

export const add = async (req: Request, res: Response, next: NextFunction) => {
    const ProizvodSlikeRepository = getRepository(ProizvodSlike);
    const proizvodSlike = new ProizvodSlike();
    proizvodSlike.urlSlike = req.body.propertyId;
    proizvodSlike.forProizvodId = Number(req.body.proizvodId);

    try {
        const proizvodSlikeSaved = await ProizvodSlikeRepository.save(proizvodSlike);
        res.customSuccess(200, 'Proizvod slike added.', { code: 0, id: proizvodSlikeSaved.id});
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't add Proizvod slike.`, null, err);
        return next(customError);
    }
};
