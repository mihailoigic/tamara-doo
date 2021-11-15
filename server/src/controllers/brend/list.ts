import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';

import { BrendSifrarnik } from '../../typeorm/entities/Brend';
import {Proizvod} from "../../typeorm/entities/Proizvod";

export const list = async (req: Request, res: Response, next: NextFunction) => {
    const brendSifrarnikRepository = getRepository(BrendSifrarnik);
    try {
        const brendovi = await brendSifrarnikRepository.find();
        const returnObject = makeResponseData(brendovi)
        res.customSuccess(200, 'List of brands.', returnObject);
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of brands.`, null, err);
        return next(customError);
    }
};

const makeResponseData = (items: any): any => {
    const responseArray: any = [];
    for (const item of items) {
        responseArray.push(makeSingleResponseItem(item));
    }

    return responseArray;
};

const makeSingleResponseItem = (item: any): any => {
    return {
        value: item.id,
        label: item.naziv,
    };
};
