import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';
import {EmailList} from "../../typeorm/entities/EmailList";

export const list = async (req: Request, res: Response, next: NextFunction) => {
    const emailRepo = getRepository(EmailList);
    try {
        const emailList = await emailRepo.find();
        const returnObject = makeResponseData(emailList)
        res.customSuccess(200, 'List of emails.', returnObject);
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of emails.`, null, err);
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
        id: item.id,
        email: item.email,
    };
};
