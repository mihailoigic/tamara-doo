import { Router } from 'express';

import auth from './auth';
import users from './users';
import velicine from './velicine';
import boje from "./boje";
import brend from "./brend";
import kategorije from "./kategorije";
import podtip from "./podtip";
import proizvod from "./proizvod";
import tip from "./tip";
import kategorijatip from "./kategorijatip";
import proizvodVelicine from "./proizvodVelicine";
import proizvodBoje from "./proizvodBoje";
import proizvodBrend from "./proizvodBrend";
import proizvodSlike from "./proizvodSlike";
import kategorijaTipPodtip from "./kategorijaTipPodtip";
import proizvodLast from "./proizvodLast";
import emailList from "./emailList";
import izmeniProizvod from "./izmeniProizvod";
import checkout from "./checkout";
import discount from "./discount";
import popularProducts from "./popularProducts";

const router = Router();

router.use('/auth', auth);
router.use('/users', users);

router.use('/velicine', velicine);
router.use('/boje', boje);
router.use('/brend', brend);
router.use('/kategorije', kategorije);
router.use('/tip', tip);
router.use('/podtip', podtip);
router.use('/proizvod', proizvod);
router.use('/kategorijatip', kategorijatip);
router.use('/proizvod-last', proizvodLast);
router.use('/email-list', emailList);
router.use('/izmeni-proizvod', izmeniProizvod);
router.use('/checkout', checkout);
router.use('/add-discount', discount);
router.use('/popular-products', popularProducts);

router.use('/proizvod/velicine', proizvodVelicine);
router.use('/proizvod/boje', proizvodBoje);
router.use('/proizvod/brend', proizvodBrend);
router.use('/proizvod/slike', proizvodSlike);
router.use('/proizvod/kategorijatippodtip', kategorijaTipPodtip);

export default router;
