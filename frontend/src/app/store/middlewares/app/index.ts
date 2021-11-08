import { productsMiddleware } from '../../product/productList/middleware';

export const appMiddleware = [
    ...productsMiddleware,
];