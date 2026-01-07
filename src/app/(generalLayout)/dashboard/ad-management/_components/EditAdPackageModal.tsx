"use client";

import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AForm from "@/components/form/AForm";
import { AInput } from "@/components/form/AInput";
import { Button } from "@/components/ui/button";
import { adPackageSchema } from "./AdPackageValidation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useUpdateBoostPackageMutation } from "@/redux/api/boostPackageApi";
import { DialogOverlay } from "@radix-ui/react-dialog";
import handleMutation from "@/utils/handleMutation";

interface EditAdPackageModalProps {
  children?: React.ReactNode;
  packageData: {
    id: string;
    name: string;
    price: number;
    duration: string;
  };
}

export function EditAdPackageModal({
  children,
  packageData,
}: EditAdPackageModalProps) {
  const [open, setOpen] = useState(false);
  const [updatePackage, { isLoading }] = useUpdateBoostPackageMutation();

  const onSubmit = async (data: any) => {
    data.price = Number(data.price);
    handleMutation(
      { id: packageData.id, payload: data },
      updatePackage,
      "Updating...",
      setOpen(false)
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-[.8px]" />
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Edit Boost Package
          </DialogTitle>
        </DialogHeader>

        <AForm
          schema={adPackageSchema}
          onSubmit={onSubmit}
          defaultValues={{
            name: packageData.name,
            price: packageData.price.toString(),
            duration: packageData.duration,
          }}
        >
          <div className="space-y-5 py-4">
            <AInput
              name="name"
              label="Package Name"
              placeholder="e.g., Boost Ninja"
              required
            />

            <AInput
              name="price"
              label="Price ($)"
              type="number"
              placeholder="12"
              required
            />

            <AInput
              name="duration"
              label="Duration (days)"
              type="number"
              placeholder="1"
              required
            />

            <div className="flex flex-col gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>
        </AForm>
      </DialogContent>
    </Dialog>
  );
}
