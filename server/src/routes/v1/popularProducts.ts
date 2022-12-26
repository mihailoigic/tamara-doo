import { Router } from 'express';
import {checkJwt} from "../../middleware/checkJwt";
import {list, update} from "../../controllers/popularProducts";

const router = Router();

router.put('/:id',[checkJwt], update);
router.get('/',  list);

export default router;
