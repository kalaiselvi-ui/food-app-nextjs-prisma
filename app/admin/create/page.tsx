"use client";

import { createMenuAction } from "@/app/actions/create-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import UploadExample from "@/components/upload-image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const categories = ["Pizza", "Burger", "Drinks", "Salad", "Dessert"];
  // const isPending = false;
  const [formState, action, isPending] = useActionState(createMenuAction, {
    errors: {},
  });
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (!hasSubmitted) return;
    if (formState?.success) {
      toast.success("menu item created");
      setTimeout(() => {
        router.push(formState.redirectTo!);
      }, 1000);
    } else if (formState.success === false || formState?.errors) {
      toast.error("Failed to create menu");
    }
  }, [formState.success, formState.redirectTo]);

  const handleCreateMenuAction = (formData: FormData) => {
    formData.append("image", imageUrl || "");
    setHasSubmitted(true);
    action(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-0 bg-white">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <h1>Add New Menu Items</h1>
            <Link href={"/admin/menu"}>
              <Button variant={"link"}>All Menu List</Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" action={handleCreateMenuAction}>
            <div className="space-y-2">
              <Label>Item Name</Label>
              <Input placeholder="e.g. Margheritta Pizza" name="name" />
              {formState.errors.name && (
                <p className="text-sm text-red-500">{formState.errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="breif desc of the item"
                name="description"
              />
              {formState.errors.description && (
                <p className="text-sm text-red-500">
                  {formState.errors.description}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price ($)</Label>
                <Input placeholder="0.00" name="price" type="number" />
                {formState.errors.price && (
                  <p className="text-sm text-red-500">
                    {formState.errors.price}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select name="category">
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select category"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((item, index) => (
                      <SelectItem value={item} key={index}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formState.errors.category && (
                  <p className="text-sm text-red-500">
                    {formState.errors.category}
                  </p>
                )}
              </div>
            </div>
            {/*Image Upload */}
            <div className="space-y-2 ">
              <UploadExample setImageUrl={setImageUrl} />
            </div>
            <Button disabled={isPending} type="submit" className="w-full mt-4">
              {isPending ? "Loading..." : "Add Menu"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
