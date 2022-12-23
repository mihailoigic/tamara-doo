import { Request, Response, NextFunction } from 'express';
import {getManager, getRepository} from 'typeorm';

import { Proizvod } from "../../typeorm/entities/Proizvod";
import { CustomError } from '../../utils/response/custom-error/CustomError';
import {ProizvodSlike} from "../../typeorm/entities/SlikeProizvod";
import {User} from "../../typeorm/entities/users/User";
import {ProizvodBoja} from "../../typeorm/entities/BojeProizvod";
import {ProizvodVelicina} from "../../typeorm/entities/VelicineProizvod";
import {BojaSifrarnik} from "../../typeorm/entities/Boje";

export const edit = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const { naziv, opis, cena, boje, velicine, slike } = req.body;

    const proizvodRepo = getRepository(Proizvod);
    try {

        if (boje.length < 1 || velicine.length < 1 || slike.length < 1 || !naziv || !cena) {
            const customError = new CustomError(400, 'Validation', `Validation error. Bad submit!`);
            return next(customError);
        }

        const proizvodSingle = await proizvodRepo
            .createQueryBuilder('proizvod')
            .leftJoinAndSelect('proizvod.proizvodBoja', 'boje')
            .leftJoinAndSelect('boje.forBojaSifrarnik', 'bojeNaziv')
            .leftJoinAndSelect('proizvod.proizvodVelicina', 'velicina')
            .leftJoinAndSelect('velicina.forVelicinaSifrarnik', 'velicinaNaziv')
            .leftJoinAndSelect('proizvod.proizvodBrend', 'brend')
            .leftJoinAndSelect('brend.forBrendSifrarnik', 'brendNaziv')
            .leftJoinAndSelect('proizvod.proizvodSlike', 'slike')
            .leftJoinAndSelect('proizvod.kategorijaTipPodtip', 'kategorijaTipPodTip')
            .leftJoinAndSelect('kategorijaTipPodTip.forKategorijaSifrarnik', 'kategorijaNaziv')
            .leftJoinAndSelect('kategorijaTipPodTip.forTipSifrarnik', 'tipNaziv')
            .leftJoinAndSelect('kategorijaTipPodTip.forPodtipSifrarnik', 'podtipNaziv')
            .where(`proizvod.id = ${id}`)
            .getOne();

        if (!proizvodSingle) {
            const customError = new CustomError(404, 'General', `Product with id:${id} not found.`, ['Product not found.']);
            return next(customError);
        }

        proizvodSingle.naziv = naziv;
        proizvodSingle.opis = opis;
        proizvodSingle.cena = cena;
        proizvodSingle.proizvodBoja = await makeBoje(req, proizvodSingle);
        proizvodSingle.proizvodVelicina = await makeVelicine(req, proizvodSingle);
        proizvodSingle.proizvodSlike = await makeSlike(req, proizvodSingle);

        try {
            await proizvodRepo.save({...proizvodSingle});
            res.customSuccess(200, 'Product successfully saved.');
        } catch (err) {
            const customError = new CustomError(409, 'Raw', `Product '${proizvodSingle.naziv}' can't be saved.`, null, err);
            return next(customError);
        }
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};

const makeBoje = async (req: Request, proizvod: Proizvod): Promise<ProizvodBoja[]> => {
    const { boje } = req.body;
    const bojeArray = [] as ProizvodBoja[];
    if (boje.length > 0) {
        for (const bojaElement of boje) {
            const boja = new ProizvodBoja();
            boja.forBojaId = bojaElement;
            boja.forProizvodId = Number(proizvod.id);
            bojeArray.push(boja);
        }
    }
    return bojeArray;
}

const makeVelicine = async (req: Request, proizvod: Proizvod): Promise<ProizvodVelicina[]> => {
    const { velicine } = req.body;
    const velicineArray = [] as ProizvodVelicina[];
    if (velicine.length > 0) {
        for (const velicinaElement of velicine) {
            const velicina = new ProizvodVelicina();
            velicina.forVelicinaId = velicinaElement;
            velicina.forProizvodId = Number(proizvod.id);
            velicineArray.push(velicina);
        }
    }
    return velicineArray;
}

const makeSlike = async (req: Request, proizvod: Proizvod): Promise<ProizvodSlike[]> => {
    const { slike } = req.body;
    const slikeArray = [] as ProizvodSlike[];
    if (slike.length > 0) {
        for (const slikeElement of slike) {
            const slika = new ProizvodSlike();
            slika.urlSlike = slikeElement;
            slika.forProizvodId = Number(proizvod.id);
            slikeArray.push(slika);
        }
    }
    return slikeArray;
}
