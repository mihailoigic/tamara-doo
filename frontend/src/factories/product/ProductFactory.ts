import Product from "../../entities/product/Product";
import { IProduct } from "../../entities/product/types";


export default class ProductFactory {
    public static createFromResponse(product: any): IProduct {
        const productEntity = new Product(
            product.id,
            product.brend,
            product.naziv,
            // product.kategorija,
            product.opis,
            product.rod,
            product.novo,
            product.moda,
            product.cena,
            product.defaultSlika,
            product.slike,
            product.velicine,
            product.boje,
            );
        return productEntity;
    }

}
