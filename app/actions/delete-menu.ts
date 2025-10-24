"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type DeleteMenuActionState = {
  errors?: Record<string, string[]>;
  success: boolean;
  redirectTo?: string;
  message?: string;
};

export const deleteMenuAction = async (
  id: string
): Promise<DeleteMenuActionState> => {
  try {
    await prisma.menuItem.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/admin/menu");
    return { success: true, message: "Menu deleted successfully" };
  } catch (error: unknown) {
    console.error("❌ Delete failed:", error);
    let message = "Failed to delete menu item";

    if (error instanceof Error) {
      message = error.message;
    }
    return {
      success: false,
      message,
    };
  }
};
