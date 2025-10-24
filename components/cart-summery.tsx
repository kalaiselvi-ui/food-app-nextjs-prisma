"use client";

import React from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useStore } from "@/store/store";

const CartSummary = () => {
  const cartItem = useStore((state) => state.cart);
  const subTotal = cartItem.reduce(
    (total, item) => total + Number(item.price * item.quantity),
    0
  );
  const tax = subTotal * 0.08;
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Order Summary</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>$({subTotal})</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (8%)</span>
          <span>$({tax})</span>
        </div>
        <Separator />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>$({subTotal + tax})</span>
        </div>
      </div>
      <Button className="w-full">Proceed to Checkout</Button>
    </div>
  );
};

export default CartSummary;
