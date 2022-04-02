import { CouponService } from "../coupon/coupon.service";
import { ProductService } from "../product/product.service";
import { Checkout, CheckoutArgs } from "./checkout.entity";
import { CheckoutRepository } from "./checkout.repository";

export class CheckoutService {
  constructor(
    private checkoutRepository: CheckoutRepository,
    private productService: ProductService,
    private couponService: CouponService
  ) {}

  createCheckout(args: CheckoutArgs) {
    const checkout = new Checkout(args);
    this.checkoutRepository.create(checkout);
    return checkout;
  }

  getCheckout(checkoutId: string) {
    return this.checkoutRepository.get(checkoutId);
  }

  addProductToCheckout(checkoutId: string, productId: string): Checkout {
    const checkout = this.checkoutRepository.get(checkoutId);
    const product = this.productService.getProduct(productId);

    checkout.addProduct(product);
    this.checkoutRepository.update(checkout);

    return checkout;
  }

  removeProductFromCheckout(checkoutId: string, productId: string): Checkout {
    const checkout = this.checkoutRepository.get(checkoutId);
    const product = this.productService.getProduct(productId);

    checkout.removeProduct(product.id);
    this.checkoutRepository.update(checkout);

    return checkout;
  }

  applyCouponToCheckout(checkoutId: string, couponCode: string) {
    const checkout = this.checkoutRepository.get(checkoutId);
    const coupon = this.couponService.getCoupon(couponCode);

    checkout.applyCoupon(coupon);
    this.checkoutRepository.update(checkout);

    return checkout;
  }

  removeCouponFromCheckout(checkoutId: string, couponCode: string): Checkout {
    const checkout = this.checkoutRepository.get(checkoutId);

    checkout.removeCoupon(couponCode);
    this.checkoutRepository.update(checkout);

    return checkout;
  }
}
