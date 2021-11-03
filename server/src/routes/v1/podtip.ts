import { Router } from 'express';

import { list, add, destroy } from '../../controllers/podtip';

const router = Router();

router.get('/',  list);

router.post('/', add);

router.delete('/:id', destroy);

export default router;