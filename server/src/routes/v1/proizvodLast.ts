import { Router } from 'express';
import {getLast} from "../../controllers/proizvodLast";
import {checkJwt} from "../../middleware/checkJwt";

const router = Router();

router.get('/',[checkJwt],  getLast);


export default router;
