import { prisma } from "@/lib/prisma";
import React from "react";
import { MenuItem as Item } from "@/lib/generated/prisma";
import MenuItem from "./menu-item";

const MenuList = async () => {
  const menuItems = await prisma.menuItem.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {menuItems.map((item: Item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MenuList;
