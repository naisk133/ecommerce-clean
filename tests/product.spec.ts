import { ProductService } from "../src/policy/product/product.service";

describe("checkout", () => {
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService();
  });

  test("create & list product", () => {
    const productsBefore = productService.listProducts();
    expect(productsBefore).toHaveLength(0);

    productService.createProduct({
      name: "Annual Subscription",
      price: 5000,
    });
    const productsAfter = productService.listProducts();

    expect(productsAfter).toHaveLength(1);
    expect(productsAfter[0].name).toEqual("Annual Subscription");
    expect(productsAfter[0].price).toEqual(5000);
  });

  test("delete product", () => {
    productService.createProduct({
      name: "Annual Subscription",
      price: 5000,
    });
    const productsBefore = productService.listProducts();
    expect(productsBefore).toHaveLength(1);

    productService.deleteProduct(productsBefore[0].id);
    const productsAfter = productService.listProducts();

    expect(productsAfter).toHaveLength(0);
  });
});
