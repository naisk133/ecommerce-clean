import { CheckoutRepositoryInMemoryAdapter } from "../src/detail/adapter/checkout.adapter";
import { CheckoutRepository } from "../src/policy/checkout/checkout.repository";
import { CheckoutService } from "../src/policy/checkout/checkout.service";
import { CouponService } from "../src/policy/coupon/coupon.service";
import { ProductService } from "../src/policy/product/product.service";

describe("checkout", () => {
  let productService: ProductService;
  let couponService: CouponService;
  let checkoutService: CheckoutService;
  let checkoutRepository: CheckoutRepository;

  beforeEach(() => {
    productService = new ProductService();
    couponService = new CouponService();
    checkoutRepository = new CheckoutRepositoryInMemoryAdapter();
    checkoutService = new CheckoutService(
      checkoutRepository,
      productService,
      couponService
    );
  });

  test("create checkout", () => {
    let checkout = checkoutService.createCheckout({
      email: "wattanai.tha@gmail.com",
    });

    checkout = checkoutService.getCheckout(checkout.id);
    expect(checkout.email).toEqual("wattanai.tha@gmail.com");
  });

  test("add product to checkout", () => {
    const product = productService.createProduct({
      name: "Annual Subscription",
      price: 5000,
    });

    let checkout = checkoutService.createCheckout({
      email: "wattanai.tha@gmail.com",
    });

    checkoutService.addProductToCheckout(checkout.id, product.id);

    checkout = checkoutService.getCheckout(checkout.id);
    expect(checkout.total).toEqual(5000);
  });

  test("add multiple products to checkout", () => {
    const product = productService.createProduct({
      name: "Annual Subscription",
      price: 5000,
    });
    const product2 = productService.createProduct({
      name: "Branding Formula",
      price: 2000,
    });

    let checkout = checkoutService.createCheckout({
      email: "wattanai.tha@gmail.com",
    });

    checkoutService.addProductToCheckout(checkout.id, product.id);
    checkoutService.addProductToCheckout(checkout.id, product2.id);

    checkout = checkoutService.getCheckout(checkout.id);
    expect(checkout.total).toEqual(7000);
  });

  test("apply coupon to checkout", () => {
    const product = productService.createProduct({
      name: "Annual Subscription",
      price: 5000,
    });
    const coupon = couponService.createCoupon({
      code: "testcoupon",
      discount: 200,
    });

    let checkout = checkoutService.createCheckout({
      email: "wattanai.tha@gmail.com",
    });

    checkout = checkoutService.addProductToCheckout(checkout.id, product.id);
    checkout = checkoutService.applyCouponToCheckout(checkout.id, coupon.code);

    checkout = checkoutService.getCheckout(checkout.id);
    expect(checkout.total).toEqual(4800);
  });

  test("remove product from checkout", () => {
    const product = productService.createProduct({
      name: "Annual Subscription",
      price: 5000,
    });
    const product2 = productService.createProduct({
      name: "Branding Formula",
      price: 2000,
    });

    let checkout = checkoutService.createCheckout({
      email: "wattanai.tha@gmail.com",
    });
    checkout = checkoutService.addProductToCheckout(checkout.id, product.id);
    checkout = checkoutService.addProductToCheckout(checkout.id, product2.id);

    checkout = checkoutService.removeProductFromCheckout(
      checkout.id,
      product.id
    );
    expect(checkout.total).toEqual(2000);

    checkout = checkoutService.getCheckout(checkout.id);
    expect(checkout.total).toEqual(2000);
  });

  test("remove coupon to checkout", () => {
    const product = productService.createProduct({
      name: "Annual Subscription",
      price: 5000,
    });
    const coupon = couponService.createCoupon({
      code: "testcoupon",
      discount: 200,
    });

    let checkout = checkoutService.createCheckout({
      email: "wattanai.tha@gmail.com",
    });
    checkout = checkoutService.addProductToCheckout(checkout.id, product.id);
    checkout = checkoutService.applyCouponToCheckout(checkout.id, coupon.code);

    checkout = checkoutService.removeCouponFromCheckout(
      checkout.id,
      coupon.code
    );
    expect(checkout.total).toEqual(5000);

    checkout = checkoutService.getCheckout(checkout.id);
    expect(checkout.total).toEqual(5000);
  });
});
