import { Router } from 'express';
import {add} from "../../controllers/discount/add";

const router = Router();

router.post('/', add);

export default router;
