"use client";

import type React from "react";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AForm from "@/components/form/AForm";
import { AInput } from "@/components/form/AInput";
import { Button } from "@/components/ui/button";
import { adPackageSchema } from "./AdPackageValidation";
import { useState } from "react";

interface CreateAdPackageModalProps {
  children?: React.ReactNode;
}

export function CreateAdPackageModal({ children }: CreateAdPackageModalProps) {
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: z.infer<typeof adPackageSchema>) => {
    console.log("data", data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-[.8px]" />
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl mb-4">Create Package</DialogTitle>
        </DialogHeader>
        <AForm schema={adPackageSchema} onSubmit={onSubmit}>
          <AInput name="name" label="Package Name" required />
          <AInput name="budget" label="Budget" type="number" required />
          <AInput
            name="duration"
            label="Duration (days)"
            type="number"
            required
          />

          <Button type="submit" className="h-11 w-full">
            Create Package
          </Button>
        </AForm>
      </DialogContent>
    </Dialog>
  );
}
