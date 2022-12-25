import { Request, Response, NextFunction } from 'express';
import {getManager, getRepository} from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';
import {ProizvodBoja} from "../../typeorm/entities/BojeProizvod";
import {Discount} from "../../typeorm/entities/Discount";
import {Proizvod} from "../../typeorm/entities/Proizvod";
import {ProizvodBrend} from "../../typeorm/entities/BrendProizvod";
import {DiscountKategorija} from "../../typeorm/entities/DiscountKategorija";
import {DiscountBoja} from "../../typeorm/entities/DiscountBoja";
import {DiscountBrend} from "../../typeorm/entities/DiscountBrend";

export const add = async (req: Request, res: Response, next: NextFunction) => {
    const { naziv, procenat, datumOd, datumDo, kategorije, brendovi, boje } = req.body;
    const DiscountRepository = getRepository(Discount);
    const discount = new Discount();
    discount.naziv = naziv;
    discount.procenat = Number(procenat);
    discount.datumDo = datumDo;
    discount.datumOd = datumOd;

    try {
        const discountSaved = await DiscountRepository.save(discount);
        await addKategorije(kategorije, discountSaved);
        // await addBoje(boje, discountSaved);
        await addBrendovi(brendovi, discountSaved);

        res.customSuccess(200, 'Discount added.', { code: 0, id: discountSaved.id});
    } catch (err) {
        console
        const customError = new CustomError(400, 'Raw', `Discount can't be saved.`, null, err);
        return next(customError);
    }
};

const addKategorije = async (kategorije: number[], discount: Discount) => {
    if (kategorije.length > 0) {
        for (const item of kategorije) {
            const kategorija = new DiscountKategorija();
            kategorija.forKategorijaId = item;
            kategorija.forDiscountId = discount.id;

            await getManager().save(DiscountKategorija, kategorija);
        }
    }
}

const addBoje = async (boje: number[], discount: Discount) => {
    if (boje.length > 0) {
        for (const item of boje) {
            const boja = new DiscountBoja();
            boja.forBojaId = item;
            boja.forDiscountId = discount.id;

            await getManager().save(DiscountBoja, boja);
        }
    }
}

const addBrendovi = async (brendovi: number[], discount: Discount) => {
    if (brendovi.length > 0) {
        for (const item of brendovi) {
            const brend = new DiscountBrend();
            brend.forBrendId = item;
            brend.forDiscountId = discount.id;

            await getManager().save(DiscountBrend, brend);
        }
    }
}
