import {Request, Response, NextFunction} from 'express';
import {getRepository} from 'typeorm';

import {Proizvod} from '../../typeorm/entities/Proizvod';
import {CustomError} from '../../utils/response/custom-error/CustomError';
import {Discount} from "../../typeorm/entities/Discount";
import {DiscountOne} from "../../typeorm/entities/DiscountOne";
import {PopularProducts} from "../../typeorm/entities/PopularProducts";


export const list = async (req: Request, res: Response, next: NextFunction) => {
    const id = 1;
    try {
        const popularProducts = await getRepository(PopularProducts).findOne({where: {id}});

        res.customSuccess(200, 'List of popular product id s.', popularProducts);
    } catch (err) {
        console.log(err);
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of products.`, null, err);
        return next(customError);
    }
};