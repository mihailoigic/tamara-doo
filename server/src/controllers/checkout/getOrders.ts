import { Request, Response, NextFunction } from 'express';
import {getManager, getRepository} from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';
import {Cart} from "../../typeorm/entities/Cart";

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    const { status = null, brojKupovine = null } = req.query;
    try {
        const orders = await getRepository(Cart)
            .createQueryBuilder('cart')
            .innerJoinAndSelect('cart.korisnikId', 'korisnici')
            .leftJoinAndSelect('cart.cartItems', 'cartitems')
            .leftJoinAndSelect('cartitems.proizvodId', 'proizvod')
            .andWhere(status ? `cart.status = '${status}'` : 'TRUE')
            .andWhere(brojKupovine ? `cart.brojKupovine ILike '%${brojKupovine}%'` : 'TRUE')
            .getMany();
        if(orders && orders.length < 1){
            const customError = new CustomError(404, 'Raw', `There are no ${status} orders!`, null);
            return next(customError);
        }
        res.customSuccess(200, 'List of orders.', orders);
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of orders.`, null, err);
        return next(customError);
    }
};