import { Router } from 'express';

import { list, getOne, add, destroy } from '../../controllers/proizvod';
import {checkJwt} from "../../middleware/checkJwt";

const router = Router();

router.get('/', list);

router.get('/:id', getOne);

router.post('/', [checkJwt], add);

router.delete('/:id', [checkJwt], destroy);
export default router;
