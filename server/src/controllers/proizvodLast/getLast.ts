import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';

import {Proizvod} from "../../typeorm/entities/Proizvod";

export const getLast = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.query;

    const ProizvodRepository = getRepository(Proizvod);
    try {
        console.log(name);
        const proizvod = await ProizvodRepository.find({
            where: {
                naziv: name,
            }
        });
        res.customSuccess(200, 'List of users.', proizvod);
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of users.`, null, err);
        return next(customError);
    }
};
