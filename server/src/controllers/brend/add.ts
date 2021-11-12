import { Request, Response, NextFunction } from 'express';
import { getManager } from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';

import { BrendSifrarnik } from '../../typeorm/entities/Brend';

export const add = async (req: Request, res: Response, next: NextFunction) => {
    const brend = makeNewBrend(req);

    try {
        const brandExists = await getManager().findOne(BrendSifrarnik, { naziv: brend.naziv});
        if(!brandExists){
            const brendSaved = await getManager().save(BrendSifrarnik, brend);
            res.customSuccess(200, 'boja added.', { code: 0, id: brendSaved.id});
        } else{
            const customError = new CustomError(400, 'Raw', `Brend already exists!`, null);
            return next(customError);
        }
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of brands.`, null, err);
        return next(customError);
    }
};

const makeNewBrend = (req: Request): BrendSifrarnik =>{
    const brend = new BrendSifrarnik();
    const { naziv } = req.body;

    brend.naziv = naziv;

    return brend;
}