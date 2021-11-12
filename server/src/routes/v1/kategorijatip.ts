import { Router } from 'express';

import { list } from '../../controllers/kategorijatip';

const router = Router();

router.get('/',  list);

export default router;
