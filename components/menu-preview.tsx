import { prisma } from "@/lib/prisma";
import { ImageKitProvider } from "@imagekit/next";
import { ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const MenuPreview = async () => {
  const menuItem = await prisma.menuItem.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
    select: {
      id: true,
      name: true,
      description: true,
      imageUrl: true,
      price: true,
    },
  });
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2>Our Signature Menu</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A selection of the most popular dishes loved by our customers
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {menuItem.map((item) => (
          <div
            className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            key={item.id}
          >
            <div className="relative h-64">
              {item.imageUrl && (
                <ImageKitProvider urlEndpoint="https://ik.imagekit.io/sarvesh26">
                  <Image
                    src={item.imageUrl}
                    alt=""
                    fill
                    className="object-cover bg-black/20 group-hover:scale-105 transition-105"
                  />
                </ImageKitProvider>
              )}
            </div>
            <div className="p-6 bg-background">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl">{item.name}</h3>
                <span className="font-bold text-primary">$ {item.price}</span>
              </div>
              <p className="text-muted-foreground mb-4">{item.description}</p>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">4</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Button asChild>
          <Link href={"/menu"}>
            View Full Menu <ChevronRight className="mr-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default MenuPreview;
