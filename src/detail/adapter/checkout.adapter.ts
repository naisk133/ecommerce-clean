import { Checkout } from "../../policy/checkout/checkout.entity";
import { CheckoutRepository } from "../../policy/checkout/checkout.repository";

export class CheckoutRepositoryInMemoryAdapter implements CheckoutRepository {
  private checkouts: Checkout[] = [];

  create(checkout: Checkout): Checkout {
    this.checkouts.push(checkout);
    return checkout;
  }

  get(checkoutId: string) {
    return this.checkouts.filter((c) => c.id === checkoutId)[0];
  }

  update(checkout: Checkout) {
    this.delete(checkout.id);
    this.checkouts.push(checkout);
    return checkout;
  }

  delete(checkoutId: string) {
    this.checkouts = this.checkouts.filter((c) => c.id !== checkoutId);
  }
}
