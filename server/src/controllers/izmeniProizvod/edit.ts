import { Request, Response, NextFunction } from 'express';
import {getManager, getRepository} from 'typeorm';

import { Proizvod } from "../../typeorm/entities/Proizvod";
import { CustomError } from '../../utils/response/custom-error/CustomError';
import {ProizvodSlike} from "../../typeorm/entities/SlikeProizvod";
import {User} from "../../typeorm/entities/users/User";

export const edit = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const { naziv, opis } = req.body;

    const proizvodRepo = getRepository(Proizvod);
    try {
        const proizvod = await proizvodRepo.findOne({ where: { id } });

        if (!proizvod) {
            const customError = new CustomError(404, 'General', `Product with id:${id} not found.`, ['Product not found.']);
            return next(customError);
        }

        proizvod.naziv = naziv;
        proizvod.opis = opis;

        await makeSlike(req, id, proizvod);
        try {
            await proizvodRepo.save(proizvod);
            res.customSuccess(200, 'Product successfully saved.');
        } catch (err) {
            const customError = new CustomError(409, 'Raw', `Product '${proizvod.naziv}' can't be saved.`, null, err);
            return next(customError);
        }
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};

const makeSlike = async (req: Request, id: number | string, proizvod: Proizvod) => {
    const { slike } = req.body;
    if (slike.length > 0) {
        let brojac = 0;
        const slikeArray = [] as ProizvodSlike[];
        for (const slikeElement of slike) {
            if (brojac === 0) {
                proizvod.defaultSlika = slikeElement;
            }
            const slika = new ProizvodSlike();
            slika.urlSlike = slikeElement;
            slika.forProizvodId = Number(id);
            slikeArray.push(slika);
            brojac++;
        }

        const proizvodSlikeRepo = getRepository(ProizvodSlike);
        const niz = await proizvodSlikeRepo.find({where: {forproizvod: id}});

        for (const item of niz) {
            await proizvodSlikeRepo.delete(item.id);
        }

        await getManager().save(ProizvodSlike, slikeArray);
    }
}
