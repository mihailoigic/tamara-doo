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

export default router;
