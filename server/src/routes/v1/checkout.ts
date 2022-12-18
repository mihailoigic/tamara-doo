import { Router } from 'express';

import {checkJwt} from "../../middleware/checkJwt";
import {add} from "../../controllers/checkout/add";

const router = Router();

router.post('/', add);

export default router;
