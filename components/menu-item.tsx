"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { ImageKitProvider } from "@imagekit/next";
import Image from "next/image";
import { MenuItem as MenuItemType } from "@/lib/generated/prisma";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useStore } from "@/store/store";

const MenuItem = ({ item }: { item: MenuItemType }) => {
  const addToCart = useStore((state) => state.addToCart);
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0 pb-4">
        {item.imageUrl && (
          <ImageKitProvider urlEndpoint="https://ik.imagekit.io/sarvesh26">
            <Image
              src={item.imageUrl}
              alt=""
              width={400}
              height={400}
              className="object-cover w-full h-48"
            />
          </ImageKitProvider>
        )}
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-muted-foreground mt-1 text-sm">{item.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <span>$ {item.price}</span>
        <Button
          onClick={() => {
            addToCart(item), console.log(item.name);
          }}
          size={"sm"}
          className="gap-1 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add To Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItem;
