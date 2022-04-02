import { v4 as uuid } from "uuid";

export type ProductArgs = { name: string; price: number };

export class Product {
  id: string;
  name: string;
  price: number;

  constructor(args: ProductArgs) {
    this.id = uuid();
    this.name = args.name;
    this.price = args.price;
  }
}

export class ProductService {
  private products: Product[] = [];

  createProduct(args: ProductArgs) {
    const newProduct = new Product(args);
    this.products.push(newProduct);
    return newProduct;
  }

  getProduct(productId: string): Product {
    return this.products.filter((p) => p.id === productId)[0];
  }

  listProducts(): Product[] {
    return this.products;
  }

  deleteProduct(productId: string) {
    this.products = this.products.filter((p) => p.id !== productId);
  }
}
