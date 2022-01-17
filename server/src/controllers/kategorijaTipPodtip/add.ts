import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';
import {KategorijaTipPodtip} from "../../typeorm/entities/KategorijaTipPodtip";

export const add = async (req: Request, res: Response, next: NextFunction) => {
    const kategorijeTipPodtipRepository = getRepository(KategorijaTipPodtip);
    const kategorijeTipPodtip = new KategorijaTipPodtip();
    kategorijeTipPodtip.forKategorija = Number(req.body.kategorijaId);
    kategorijeTipPodtip.forTip = Number(req.body.tipId);
    kategorijeTipPodtip.forPodtip = Number(req.body.podtipId);
    kategorijeTipPodtip.forProizvodId = Number(req.body.proizvodId);

    try {
        const kategorijeTipPodtipSaved = await kategorijeTipPodtipRepository.save(kategorijeTipPodtip);
        res.customSuccess(200, 'CategoryTypeSubtype added.', { code: 0, id: kategorijeTipPodtipSaved.id});
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't add CategoryTypeSubtype`, null, err);
        return next(customError);
    }
};

