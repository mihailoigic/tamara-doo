import { Router } from 'express';

import { list } from '../../controllers/proizvod';

const router = Router();

router.get('/', list);

export default router;
