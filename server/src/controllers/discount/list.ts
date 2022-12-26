import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from '../../utils/response/custom-error/CustomError';
import {Discount} from "../../typeorm/entities/Discount";

export const list = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const discounts = await getRepository(Discount)
            .createQueryBuilder('discount')
            .where(`discount.datumdo > now() and discount.datumod < now()`)
            .getMany();

        res.customSuccess(200, 'List of products.', discounts);
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
