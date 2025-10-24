"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { Textarea } from "./ui/textarea";
import React, { useActionState, useEffect, useRef } from "react";
import {
  UpdateMenuAction,
  UpdateMenuFormState,
} from "@/app/actions/update-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { MenuItem } from "@/lib/generated/prisma";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const UpdateMenu = ({ item }: { item: MenuItem }) => {
  const categories = ["Pizza", "Burger", "Drinks", "Salad", "Dessert"];
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null); // ✅ ref to close button

  const [formState, action, isPending] = useActionState(
    async (prevState: UpdateMenuFormState, formData: FormData) =>
      await UpdateMenuAction(prevState, formData, item.id),
    {
      errors: {},
    }
  );

  useEffect(() => {
    if (formState?.success) {
      toast.success("Menu updated successfully!");
      router.refresh();
      closeRef.current?.click();
    } else if (formState?.success === false && formState?.errors?.formError) {
      toast.error(formState.errors.formError[0] || "Failed to update menu");
    }
  }, [formState, router]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} size={"icon"}>
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Menu Item</DialogTitle>
          <DialogDescription>
            Make changes to your menu here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action={action}>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="name-1">Item Name</Label>
              <Input id="name" name="name" defaultValue={item.name} />
              {formState.errors.name && (
                <p className="text-sm text-red-500">{formState.errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                defaultValue={item.description}
                placeholder="brief description of the menu item"
              />
              {formState.errors.description && (
                <p className="text-sm text-red-500">
                  {formState.errors.description}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  placeholder="0.00"
                  name="price"
                  type="number"
                  defaultValue={item.price}
                />
                {formState.errors.price && (
                  <p className="text-sm text-red-500">
                    {formState.errors.price}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select name="category" defaultValue={item.category ?? ""}>
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
          </div>
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? "Saving" : "Save Changes"}
          </Button>
          {/* ✅ Hidden close button used programmatically */}
          <DialogClose asChild>
            <button ref={closeRef} type="button" className="hidden" />
          </DialogClose>
          {formState.errors.formError && (
            <p className="text-sm text-red-500">
              {formState.errors.formError[0]}
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateMenu;
