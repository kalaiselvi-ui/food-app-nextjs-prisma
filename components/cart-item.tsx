import React from "react";
import { cartItem as Item, useStore } from "@/store/store";
import Image from "next/image";
import { Button } from "./ui/button";
import { Minus, Plus, X } from "lucide-react";
import { Input } from "./ui/input";

const CartItems = ({ item }: { item: Item }) => {
  const removeCart = useStore((state) => state.removeFromCart);
  const decrementQuantity = useStore((state) => state.decrementQuantity);
  const incrementQuantity = useStore((state) => state.incrementQuantity);

  return (
    <div className="flex items-stretch gap-4 border rounded-lg p-4">
      <div className="relative w-24 h-24">
        {item.imageUrl && (
          <Image
            src={item.imageUrl}
            alt=""
            fill
            className="object-cover rounded-md"
          />
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-muted-foreground text-sm">$ {item.price}</p>
          </div>
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => removeCart(item.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => decrementQuantity(item.id)}
            variant={"outline"}
            size={"icon"}
            className="w-8 h-8"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Input
            type="number"
            value={item.quantity}
            className="w-12 text-center h-8"
            min={"1"}
            readOnly
          />
          <Button
            onClick={() => incrementQuantity(item.id)}
            variant={"outline"}
            size={"icon"}
            className="h-8 w-8"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
