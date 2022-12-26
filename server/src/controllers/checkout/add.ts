import { Request, Response, NextFunction } from 'express';
import { getManager } from 'typeorm';
import { CustomError } from '../../utils/response/custom-error/CustomError';

import { BrendSifrarnik } from '../../typeorm/entities/Brend';
import {Korisnik} from "../../typeorm/entities/Korisnik";
import {CartItem} from "../../typeorm/entities/CartItem";
import {Cart} from "../../typeorm/entities/Cart";

export const add = async (req: Request, res: Response, next: NextFunction) => {
    const korisnik = getKorisnik(req);
    try {
        const existingKorisnik = await getManager().findOne(Korisnik, { email: korisnik.email });
        if (!existingKorisnik) {
            //sacuvaj korisnika ako ne postoji
            const savedKorisnik = await getManager().save(Korisnik, korisnik);
            await saveKorpa(req, savedKorisnik, res);
        } else {
            //ako postoji onda ti treba njegov id
            await saveKorpa(req, existingKorisnik, res);
        }
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't finish checkout process!`, null, err);
        return next(customError);
    }
};

const saveKorpa = async (req: Request, korisnik: Korisnik, res: Response) => {
    const korpa = await getCart(req, korisnik);
    const savedKorpa = await getManager().save(Cart, korpa);
    const cartItems = getCartItems(req, savedKorpa);
    for (const item of cartItems) {
        await getManager().save(CartItem, item);
    }
    res.customSuccess(200, 'Purchase successful', {code: 0, id: savedKorpa.brojKupovine});
}

const getCart = async (req: Request, korisnik: Korisnik): Promise<Cart> => {
    const cart = new Cart();

    cart.korisnikId = korisnik;
    cart.napomena = req.body.napomena;
    cart.brojKupovine = await getBrojKupovine();

    return cart;
}

const getBrojKupovine = async () => {
    while (true) {
        const randomBroj = generate(6);
        const brojKupovine = await getManager().findOne(Cart, {brojKupovine: randomBroj});
        if (!brojKupovine) {
            return randomBroj;
        }
    }
};

const getKorisnik = (req: Request): Korisnik => {
    const korisnik = new Korisnik();
    korisnik.ime = req.body.korisnik.ime;
    korisnik.prezime = req.body.korisnik.prezime;
    korisnik.adresa = req.body.korisnik.adresa;
    korisnik.grad = req.body.korisnik.grad;
    korisnik.brojStana = req.body.korisnik.stan;
    korisnik.telefon = req.body.korisnik.telefon;
    korisnik.email = req.body.korisnik.email;
    return korisnik;
}

const getCartItems = (req: Request, cart: Cart): CartItem[] => {
    const cartItems: CartItem[] = [];
    req.body.cartItems.forEach(item => {
        const cena = item.proizvod.cenaSaPopustom ?? item.proizvod.cena;
        const cartItem = new CartItem();
        cartItem.proizvodId = item.proizvod.id;
        cartItem.cartId = cart;
        cartItem.boja = item.boja;
        cartItem.velicina = item.velicina;
        cartItem.dubinaKorpe = item.dubinaKorpe;
        cartItem.kolicina = item.kolicina;
        cartItem.cena = cena;
        cartItems.push(cartItem);
    });
    return cartItems;
}

function generate(n) {
    var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.

    if ( n > max ) {
        return generate(max) + generate(n - max);
    }

    max        = Math.pow(10, n+add);
    var min    = max/10; // Math.pow(10, n) basically
    var number = Math.floor( Math.random() * (max - min + 1) ) + min;

    return ("" + number).substring(add);
}