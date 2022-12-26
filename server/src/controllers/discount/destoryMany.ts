import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';
import {Discount} from "../../typeorm/entities/Discount";

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const discountRepo = getRepository(Discount);
    const discount = await discountRepo.findOne({ where: {id} });
    try {
        if (!discount) {
            const customError = new CustomError(400, 'Raw', `No discount with id: ${id}`, null);
            return next(customError);
        }
        const date = new Date();
        const yesterday = new Date();
        yesterday.setDate(date.getDate() - 1);
        discount.datumDo = yesterday;
        await discountRepo.save(discount);
        res.customSuccess(200, 'Success.', { code: 0, message: `Discount with id: ${id} successfully deleted.`});
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
