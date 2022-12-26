import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from '../../utils/response/custom-error/CustomError';
import {DiscountOne} from "../../typeorm/entities/DiscountOne";

export const destroyOne = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const discountOneRepo = getRepository(DiscountOne);
    try {
        await discountOneRepo.delete(id);
        res.customSuccess(200, 'Success.', { code: 0, message: `Discount one with proizvod id: ${id} successfully deleted.`});
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
