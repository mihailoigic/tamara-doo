import { Router } from 'express';
import { list, add, destroy } from "../../controllers/kategorijatip";
import {checkJwt} from "../../middleware/checkJwt";


const router = Router();

router.get('/',  list);

router.post('/', [checkJwt], add);

router.delete('/:id', [checkJwt], destroy);

export default router;
