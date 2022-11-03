import { Router } from 'express';

import {checkJwt} from "../../middleware/checkJwt";
import {edit} from "../../controllers/izmeniProizvod/edit";

const router = Router();

router.put('/:id',[checkJwt], edit);

export default router;
