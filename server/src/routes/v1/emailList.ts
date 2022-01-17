import { Router } from 'express';
import {checkJwt} from "../../middleware/checkJwt";
import {add, list, destroy} from "../../controllers/emailList";

const router = Router();

router.get('/',[checkJwt],  list);
router.post('/', add);
router.delete('/:id',[checkJwt],  destroy);


export default router;
