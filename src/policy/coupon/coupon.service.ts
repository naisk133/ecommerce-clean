export type CouponArgs = { code: string; discount: number };

export class Coupon {
  code: string;
  discount: number;
}

export class CouponService {
  private coupons: Coupon[] = [];

  createCoupon(args: CouponArgs): Coupon {
    this.coupons.push(args);
    return args;
  }

  getCoupon(code: string): Coupon {
    return this.coupons.filter((c) => c.code === code)[0];
  }
}
