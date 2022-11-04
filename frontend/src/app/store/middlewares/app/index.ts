import { productsMiddleware } from '../../product/productList/middleware';
import {sessionDataMiddleware} from "../../sessionData/middleware";

export const appMiddleware = [
    ...productsMiddleware,
    ...sessionDataMiddleware,
];