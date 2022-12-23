import { Router } from 'express';
import {checkJwt} from "../../middleware/checkJwt";
import {add} from "../../controllers/checkout/add";
import {getOrders} from "../../controllers/checkout/getOrders";
import {activateOrder} from "../../controllers/checkout/activateOrder";
import {cancelOrder} from "../../controllers/checkout/cancelOrder";
import {confirmOrder} from "../../controllers/checkout/confirmOrder";

const router = Router();

router.post('/', add);
router.get('/', [checkJwt], getOrders);
router.put('/activate/:id', [checkJwt], activateOrder);
router.put('/cancel/:id', [checkJwt], cancelOrder);
router.put('/confirm/:id', [checkJwt], confirmOrder);

export default router;
