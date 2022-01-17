import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';

import { KategorijeSifrarnik } from '../../typeorm/entities/Kategorije';

export const list = async (req: Request, res: Response, next: NextFunction) => {
    const kategorijeSifrarnikRepository = getRepository(KategorijeSifrarnik);

    // const kategorijeTipData = await getRepository(KategorijeSifrarnik)
    //     .createQueryBuilder('proizvod')
    //     .innerJoinAndSelect('proizvod.proizvodBoja', 'boje')
    //     .innerJoinAndSelect('boje.forBojaSifrarnik', 'bojeNaziv')

    try {
        const kategorije = await kategorijeSifrarnikRepository.find();
        res.customSuccess(200, 'List of categories.', kategorije);
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of categories.`, null, err);
        return next(customError);
    }
};
