import { Router } from 'express';

import { list, add, destroy } from '../../controllers/kategorije';

const router = Router();

router.get('/',  list);

router.post('/', add);

router.delete('/:id', destroy);

export default router;
