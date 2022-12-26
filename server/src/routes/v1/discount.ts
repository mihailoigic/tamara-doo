import { Router } from 'express';
import {add, addOne, destroy, destroyOne, list} from "../../controllers/discount";
import {checkJwt} from "../../middleware/checkJwt";

const router = Router();

router.post('/',[checkJwt], add);
router.post('/:id',[checkJwt], addOne)
router.delete('/:id',[checkJwt], destroyOne);
router.put('/update/:id',[checkJwt], destroy);
router.get('/', [checkJwt], list);

export default router;
