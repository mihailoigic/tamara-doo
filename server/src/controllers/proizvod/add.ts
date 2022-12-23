import { Request, Response, NextFunction } from 'express';
import { getManager } from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';
import {Proizvod} from "../../typeorm/entities/Proizvod";
import {ProizvodBoja} from "../../typeorm/entities/BojeProizvod";
import {KategorijaTipPodtip} from "../../typeorm/entities/KategorijaTipPodtip";
import {ProizvodBrend} from "../../typeorm/entities/BrendProizvod";
import {ProizvodSlike} from "../../typeorm/entities/SlikeProizvod";
import {ProizvodVelicina} from "../../typeorm/entities/VelicineProizvod";

export const add = async (req: Request, res: Response, next: NextFunction) => {
    const proizvod = makeProduct(req);
    try {
        const proizvodExists = await getManager().findOne(Proizvod, { naziv: proizvod.naziv});
        if(!proizvodExists){
            const proizvodSaved = await getManager().save(Proizvod, proizvod);
            await makeKategorijaTipPodtip(req, proizvodSaved);
            await makeBrend(req, proizvodSaved);
            await makeBoje(req, proizvodSaved);
            await makeVelicine(req, proizvodSaved);
            await makeSlike(req, proizvodSaved);
            res.customSuccess(200, 'Proizvod added.', { code: 0, id: proizvodSaved.id});
        } else{
            const customError = new CustomError(400, 'Raw', `Product already exists!`, null);
            return next(customError);
        }
    } catch (err) {
        console.log(err);
        const customError = new CustomError(400, 'Raw', `Can't add product.`, null, err);
        return next(customError);
    }
};

const makeProduct = (req: Request): Proizvod => {
    const { naziv, opis, defaultSlika, novo, moda, rod, cena } = req.body;
    const proizvod = new Proizvod();
    proizvod.naziv = naziv;
    proizvod.opis = opis;
    proizvod.defaultSlika = defaultSlika;
    proizvod.novo = Boolean(novo);
    proizvod.moda = Boolean(moda);
    proizvod.rod = Number(rod);
    proizvod.cena = Number(cena);

    return proizvod;
}

const makeKategorijaTipPodtip = async (req: Request, proizvod: Proizvod) => {
    const { kategorija, tip, podtipovi } = req.body;
    if (podtipovi?.length > 0) {
        const kategorijaPodtip = [] as KategorijaTipPodtip[];
        for (const podtip of podtipovi) {
            const kategorijaTipPodtip = new KategorijaTipPodtip();
            kategorijaTipPodtip.forKategorija = Number(kategorija);
            kategorijaTipPodtip.forTip = Number(tip) ? Number(tip) : null;
            kategorijaTipPodtip.forPodtip = Number(podtip);
            kategorijaTipPodtip.forProizvodId = Number(proizvod.id);
            kategorijaPodtip.push(kategorijaTipPodtip);
        }
        await getManager().save(KategorijaTipPodtip, kategorijaPodtip);
    } else {
        const kategorijatp = new KategorijaTipPodtip();
        kategorijatp.forKategorija = Number(kategorija);
        kategorijatp.forTip = Number(tip) ? Number(tip) : null;
        kategorijatp.forProizvodId = Number(proizvod.id);
        await getManager().save(KategorijaTipPodtip, kategorijatp);
    }
}

const makeBrend = async (req: Request, proizvod: Proizvod) => {
    const { brend } = req.body;
    const pBrend = new ProizvodBrend();
    pBrend.forBrendId = Number(brend);
    pBrend.forProizvodId = Number(proizvod.id);
    await getManager().save(ProizvodBrend, pBrend);
}

const makeSlike = async (req: Request, proizvod: Proizvod) => {
    const { slike } = req.body;
    if (slike.length > 0) {
        const slikeArray = [] as ProizvodSlike[];
        for (const slikeElement of slike) {
            const slika = new ProizvodSlike();
            slika.urlSlike = slikeElement;
            slika.forProizvodId = Number(proizvod.id);
            slikeArray.push(slika);
        }
        await getManager().save(ProizvodSlike, slikeArray);
    }
}

const makeBoje = async (req: Request, proizvod: Proizvod) => {
    const { boje } = req.body;
    if (boje.length > 0) {
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

const makeVelicine = async (req: Request, proizvod: Proizvod) => {
    const { velicine } = req.body;
    if (velicine.length > 0) {
        const velicineArray = [] as ProizvodVelicina[];
        for (const velicinaElement of velicine) {
            const velicina = new ProizvodVelicina();
            velicina.forVelicinaId = velicinaElement;
            velicina.forProizvodId = Number(proizvod.id);
            velicineArray.push(velicina);
        }
        await getManager().save(ProizvodVelicina, velicineArray);
    }
}

