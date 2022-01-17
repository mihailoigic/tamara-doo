import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../../typeorm/entities/users/User';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const isLogedIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
    res.customSuccess(200, 'User Loged in.');
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
