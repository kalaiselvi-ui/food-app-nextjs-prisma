"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deleteMenuAction } from "@/app/actions/delete-menu";

type Props = {
  id: string;
};

export default function DeleteMenuButton({ id }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const res = await deleteMenuAction(id); // ✅ Server-side action (DB delete)
      console.log(res, "delete");
      if (res.success) {
        toast.success(res.message || "Menu deleted successfully");
        router.refresh(); // ✅ re-fetch updated data from server
      } else {
        toast.error(res.message || "Failed to delete menu");
      }
    });
  };

  return (
    <Button
      onClick={handleDelete}
      variant="ghost"
      size="icon"
      className="text-destructive"
      disabled={isPending}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
