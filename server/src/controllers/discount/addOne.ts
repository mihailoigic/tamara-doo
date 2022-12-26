import { Request, Response, NextFunction } from 'express';
import {getRepository} from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';
import {Proizvod} from "../../typeorm/entities/Proizvod";
import {DiscountOne} from "../../typeorm/entities/DiscountOne";

export const addOne = async (req: Request, res: Response, next: NextFunction) => {
    const { procenat } = req.body;
    const { id } = req.params;
    const DiscountOneRepository = getRepository(DiscountOne);
    const discountOne = new DiscountOne();
    discountOne.procenat = procenat;

    try {
        const proizvod = await getRepository(Proizvod).findOne({where: {id}});
        if (!proizvod) {
            const customError = new CustomError(400, 'Raw', `No proizvod with id: ${id}.`, null);
            return next(customError);
        }
        discountOne.forDiscountOneProizvod = proizvod;
        const discountOneSaved = await DiscountOneRepository.save(discountOne);

        res.customSuccess(200, `Discount for one proizvod with id: ${id} added.`, { code: 0, id: discountOneSaved.id});
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Discount one can't be saved.`, null, err);
        return next(customError);
    }
};
