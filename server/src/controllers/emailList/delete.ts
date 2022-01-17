import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from '../../utils/response/custom-error/CustomError';
import {EmailList} from "../../typeorm/entities/EmailList";

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const emailRepo = getRepository(EmailList);
    try {
        emailRepo.delete(id);
        res.customSuccess(200, 'Success.', { code: 0, message: `Email id: ${id} successfully deleted.`});
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
