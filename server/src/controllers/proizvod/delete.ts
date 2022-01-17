import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from '../../utils/response/custom-error/CustomError';
import {Proizvod} from "../../typeorm/entities/Proizvod";

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const proizvodRepository = getRepository(Proizvod);
    try {
        proizvodRepository.delete(id);
        res.customSuccess(200, 'Success.', { code: 0, message: `Proizvod id: ${id} successfully deleted.`});
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
