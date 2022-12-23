import { Request, Response, NextFunction } from 'express';
import {getManager, getRepository} from 'typeorm';

import { Proizvod } from "../../typeorm/entities/Proizvod";
import { CustomError } from '../../utils/response/custom-error/CustomError';
import {ProizvodSlike} from "../../typeorm/entities/SlikeProizvod";
import {ProizvodBoja} from "../../typeorm/entities/BojeProizvod";
import {ProizvodVelicina} from "../../typeorm/entities/VelicineProizvod";

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
        try {
            await proizvodRepo.save(proizvodSingle);
            await makeBoje(req, proizvodSingle);
            await makeVelicine(req, proizvodSingle);
            await makeSlike(req, proizvodSingle);
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

const makeBoje = async (req: Request, proizvod: Proizvod): Promise<void> => {
    const { boje } = req.body;
    if (boje.length > 0) {
        await getRepository(ProizvodBoja).delete({ forProizvodId: Number(proizvod.id) });
        const bojeArray = [] as ProizvodBoja[];
        for (const bojaElement of boje) {
                const boja = new ProizvodBoja();
                boja.forBojaId = bojaElement;
                boja.forProizvodId = Number(proizvod.id);
                bojeArray.push(boja);
        }
        await getManager().save(ProizvodBoja, bojeArray);
    }
}

const makeVelicine = async (req: Request, proizvod: Proizvod): Promise<void> => {
    const { velicine } = req.body;
    if (velicine.length > 0) {
        const velicineArray = [] as ProizvodVelicina[];
        await getRepository(ProizvodVelicina).delete({ forProizvodId: Number(proizvod.id) });
        for (const velicinaElement of velicine) {
            const velicina = new ProizvodVelicina();
            velicina.forVelicinaId = velicinaElement;
            velicina.forProizvodId = Number(proizvod.id);
            velicineArray.push(velicina);
        }
        await getManager().save(ProizvodVelicina, velicineArray);
    }
}

const makeSlike = async (req: Request, proizvod: Proizvod): Promise<void> => {
    const { slike } = req.body;
    if (slike.length > 0) {
        const slikeArray = [] as ProizvodSlike[];
        await getRepository(ProizvodSlike).delete({ forProizvodId: Number(proizvod.id) });
        for (const slikeElement of slike) {
            const slika = new ProizvodSlike();
            slika.urlSlike = slikeElement;
            slika.forProizvodId = Number(proizvod.id);
            slikeArray.push(slika);
        }
        await getManager().save(ProizvodSlike, slikeArray);
    }
}
