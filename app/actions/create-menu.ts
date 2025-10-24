"use server";

import { prisma } from "@/lib/prisma";
import { error } from "console";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type CreateMenuFormState = {
  errors: {
    name?: string[];
    description?: string[];
    category?: string[];
    price?: string[];
    image?: string[];
    formError?: string[];
  };
  success?: boolean; // optional
  redirectTo?: string;
};

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(6, { message: "Description minimum 6 letters" }),
  category: z.string().min(1, { message: "Category is required" }),
  price: z.string().min(1, { message: "Price mustbe atleast $1" }),
  image: z
    .string()
    .url({ message: "Image must be valid URL" })
    .optional()
    .or(z.literal("")),
});

export const createMenuAction = async (
  initialState: CreateMenuFormState,
  formData: FormData
): Promise<CreateMenuFormState> => {
  const result = formSchema.safeParse({
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    price: formData.get("price") as string,
    image: formData.get("image") as string,
  });
  console.log(result);
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  try {
    await prisma.menuItem.create({
      data: {
        name: result.data.name,
        description: result.data.description,
        price: Number(result.data.price),
        category: result.data.category,
        imageUrl: result.data.image!,
      },
    });
  } catch (err: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          formError: [error.message],
        },
      };
    } else {
      return {
        errors: {
          formError: ["An Unexpected error occured"],
        },
      };
    }
  }
  revalidatePath("/admin/menu");
  return { errors: {}, success: true, redirectTo: "/admin/menu" };
};
