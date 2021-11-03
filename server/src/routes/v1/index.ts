import { Router } from 'express';

import auth from './auth';
import users from './users';
import velicine from './velicine';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);

router.use('/velicine', velicine);


export default router;
