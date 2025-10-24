"use client";

import CartItems from "@/components/cart-item";
import CartSummary from "@/components/cart-summery";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  const cartItem = useStore((state) => state.cart);
  console.log(cartItem, "cartitems");
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button asChild variant={"link"}>
          <Link href={"/menu"} className="flex justify-start items-center">
            Back to menu{" "}
            <ArrowLeft className="h-4 w-4 mr-2 flex items-center" />
          </Link>
        </Button>
      </div>
      <h1 className="text-3xl font-bold mb-8">Your cart Items</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {cartItem.length > 0 ? (
            cartItem.map((item) => <CartItems item={item} key={item.id} />)
          ) : (
            <div className="h-100 w-full grid col-span-3">
              <h3 className="text-3xl font-bold flex items-center justify-center">
                Your cart is empty
              </h3>
            </div>
          )}
        </div>
        {cartItem.length > 0 && <CartSummary />}
      </div>
    </div>
  );
};

export default page;
