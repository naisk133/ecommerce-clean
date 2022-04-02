import { Checkout } from "./checkout.entity";

export interface CheckoutRepository {
  create(checkout: Checkout): Checkout;
  get(checkoutId: string): Checkout;
  update(checkout: Checkout): Checkout;
  delete(checkoutId: string): void;
}
