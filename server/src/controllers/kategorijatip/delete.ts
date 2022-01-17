import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from '../../utils/response/custom-error/CustomError';
import {KategorijaTip} from "../../typeorm/entities/KategorijaTip";

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const kategorijeTipRepository = getRepository(KategorijaTip);
    try {
        kategorijeTipRepository.delete(id);
        res.customSuccess(200, 'Success.', { code: 0, message: `KategorijaTip id: ${id} successfully deleted.`});
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
