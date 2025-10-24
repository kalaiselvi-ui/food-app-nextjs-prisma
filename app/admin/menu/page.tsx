import DeleteMenuButton from "@/components/delete-menu-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UpdateMenu from "@/components/update-menu";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import React from "react";

const page = async () => {
  const menuItems = await prisma.menuItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="lg:col-span-2 my-4 container mx-auto px-4">
      <h1 className="font-bold text-2xl mb-5">Our Menu</h1>
      <Card>
        <CardHeader>
          <CardTitle>Current Menu Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menuItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="font-medium">
                    {item.description}
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt=""
                        className="object-contain rounded-sm"
                        width={60}
                        height={60}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{item.price}</TableCell>

                  <TableCell className="font-medium">{item.price}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <UpdateMenu item={item} />
                      <DeleteMenuButton id={item.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
