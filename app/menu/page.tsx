import MenuList from "@/components/menu-list";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="gap-4 mb-8 ">
        <h1 className="text-3xl font-bold ">Our Menu</h1>
      </div>
      <Suspense fallback={<h1>...Loading</h1>}>
        <MenuList />
      </Suspense>
    </div>
  );
};

export default page;
