import { Request, Response, NextFunction } from 'express';
import { getManager } from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';
import {Cart} from "../../typeorm/entities/Cart";

export const cancelOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const korpa = await getManager().findOne(Cart, { brojKupovine: id });
        if(korpa){
            korpa.status = 'canceled';
            await getManager().save(Cart, korpa);
            res.customSuccess(200, `Status updated to canceled for [${id}]`, { code: 0, brojKupovine: id});
        } else{
            const customError = new CustomError(400, 'Raw', `Cart with number [${id}] does not exist!`, null);
            return next(customError);
        }
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of carts.`, null, err);
        return next(customError);
    }
};