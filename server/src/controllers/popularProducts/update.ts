import {Request, Response, NextFunction} from 'express';
import {getRepository} from 'typeorm';

import {Proizvod} from '../../typeorm/entities/Proizvod';
import {CustomError} from '../../utils/response/custom-error/CustomError';
import {Discount} from "../../typeorm/entities/Discount";
import {DiscountOne} from "../../typeorm/entities/DiscountOne";
import {PopularProducts} from "../../typeorm/entities/PopularProducts";


export const update = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const {index} = req.body;
    const id1 = 1;
    try {
        const popularProducts = await getRepository(PopularProducts).findOne({where: {id: 1}});
        popularProducts[`p${id}`] = index;
        // console.log(popularProducts);
        // if (id === '1') {
        //     popularProducts.p1 = index;
        // }
        // if (id === '2') {
        //     popularProducts.p2 = index;
        // }
        // if (id === '3') {
        //     popularProducts.p3 = index;
        // }
        // if (id === '4') {
        //     popularProducts.p4 = index;
        // }
        // if (id === '5') {
        //     popularProducts.p5 = index;
        // }

        await getRepository(PopularProducts).save(popularProducts);

        res.customSuccess(200, 'Popular product updated.', popularProducts);
    } catch (err) {
        console.log(err);
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of products.`, null, err);
        return next(customError);
    }
};