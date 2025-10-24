"use server";

import { prisma } from "@/lib/prisma";
import { error } from "console";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type UpdateMenuFormState = {
  errors: {
    name?: string[];
    description?: string[];
    category?: string[];
    price?: string[];
    image?: string[];
    formError?: string[];
  };
  success?: boolean;
};

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(6, { message: "Description minimum 6 letters" }),
  category: z.string().min(1, { message: "Category is required" }),
  price: z.string().min(1, { message: "Price mustbe atleast $1" }),
});

export const UpdateMenuAction = async (
  initialState: UpdateMenuFormState,
  formData: FormData,
  id: string
): Promise<UpdateMenuFormState> => {
  const result = formSchema.safeParse({
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    price: formData.get("price") as string,
  });
  console.log(result);
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  try {
    await prisma.menuItem.update({
      where: {
        id,
      },

      data: {
        name: result.data.name,
        description: result.data.description,
        price: Number(result.data.price),
        category: result.data.category,
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
  return {
    errors: {},
    success: true,
  };
};
