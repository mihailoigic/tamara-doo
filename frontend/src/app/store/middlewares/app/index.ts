import { productsMiddleware } from '../../product/productList/middleware';
import {sessionDataMiddleware} from "../../sessionData/middleware";
import {searchParamsMiddlewares} from "../../searchParams/middleware";

export const appMiddleware = [
    searchParamsMiddlewares,
    ...productsMiddleware,
    ...sessionDataMiddleware,
];