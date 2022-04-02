import { v4 as uuid } from "uuid";
import { Coupon } from "../coupon/coupon.service";
import { Product } from "../product/product.service";

export type CheckoutArgs = { email: string };

export class Checkout {
  id: string;
  email: string;
  checkoutLines: CheckoutLine[];
  couponLines: CouponLine[];

  constructor(args: CheckoutArgs) {
    this.id = uuid();
    this.email = args.email;
    this.checkoutLines = [];
    this.couponLines = [];
  }

  addProduct(product: Product) {
    this.checkoutLines.push(new CheckoutLine(product));
  }

  removeProduct(productId: string) {
    this.checkoutLines = this.checkoutLines.filter(
      (line) => line.productId !== productId
    );
  }

  applyCoupon(coupon: Coupon) {
    this.couponLines.push(new CouponLine(coupon));
  }

  removeCoupon(couponCode: string) {
    this.couponLines = this.couponLines.filter(
      (line) => line.code !== couponCode
    );
  }

  get subtotal() {
    return this.checkoutLines.reduce((acc, line) => acc + line.productPrice, 0);
  }

  get discountTotal() {
    return this.couponLines.reduce((acc, line) => acc + line.discount, 0);
  }

  get total() {
    return this.subtotal - this.discountTotal;
  }
}

export class CheckoutLine {
  id: string;
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;

  constructor(product: Product, quantity = 1) {
    this.id = uuid();
    this.productId = product.id;
    this.productName = product.name;
    this.productPrice = product.price;
    this.quantity = quantity;
  }
}

export class CouponLine {
  id: string;
  code: string;
  discount: number;

  constructor(coupon: Coupon) {
    this.id = uuid();
    this.code = coupon.code;
    this.discount = coupon.discount;
  }
}
