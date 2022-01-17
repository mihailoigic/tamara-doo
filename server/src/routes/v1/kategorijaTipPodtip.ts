import { Router } from 'express';

import { add } from '../../controllers/kategorijaTipPodtip';
import {checkJwt} from "../../middleware/checkJwt";

const router = Router();

router.post('/', [checkJwt], add);

export default router;
