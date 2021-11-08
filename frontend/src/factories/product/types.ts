import { IProduct } from "../../entities/product/types";

export interface IProductFactory {
    createFromResponse(product: any): IProduct;
}
