"use client";

import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, UserX, Trash2 } from "lucide-react";
import { DialogOverlay } from "@radix-ui/react-dialog";

type AccountComplainDetailsModalProps = {
  children?: ReactNode;
  user: {
    name: string;
    role: string;
    avatar: string;
  };
  complaint: {
    reason: string;
    date: string;
    status: string;
    type: "ACCOUNT" | "POST";
  };
  onRestrict?: () => void;
  onRestrictAndDelete?: () => void;
  onResolve?: () => void;
};

export function AccountComplainDetailsModal({
  children,
  user,
  complaint,
  onRestrict,
  onRestrictAndDelete,
  onResolve,
}: AccountComplainDetailsModalProps) {
  const [open, setOpen] = useState(false);

  const handleRestrict = () => {
    onRestrict?.();
    setOpen(false);
  };

  const handleRestrictAndDelete = () => {
    onRestrictAndDelete?.();
    setOpen(false);
  };

  const handleResolve = () => {
    onResolve?.();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-[.8px]" />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Complaint Details
            <Badge variant="outline" className="ml-2">
              {complaint?.type}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Reported User */}
          <div className="flex items-center gap-3">
            <div
              className="size-13 bg-cover bg-center bg-no-repeat rounded-full mr-2"
              style={{
                backgroundImage: `url(${
                  user?.avatar ||
                  "https://static.vecteezy.com/system/resources/previews/024/766/958/non_2x/default-male-avatar-profile-icon-social-media-user-free-vector.jpg"
                })`,
              }}
            ></div>
            <div>
              <div className="font-medium">{user?.name}</div>
              <div className="text-sm text-muted-foreground">{user?.role}</div>
            </div>
          </div>

          {/* Complaint Information */}
          <div className="space-y-4 rounded-lg border bg-card p-4">
            <div>
              <h4 className="mb-1 text-sm font-medium text-destructive flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4" />
                Reason for complaint
              </h4>
              <p className="text-sm">{complaint?.reason}</p>
            </div>

            <div className="text-xs text-muted-foreground">
              Reported {complaint?.date} • Status: {complaint?.status}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div>
          <div className="flex items-center justify-between gap-4 mb-4">
            <Button
              variant="outline"
              onClick={handleResolve}
              className="w-[48%] py-5"
            >
              Mark as Resolved
            </Button>

            <Button
              variant={
                complaint?.type === "ACCOUNT" ? "destructive" : "default"
              }
              onClick={handleRestrict}
              className="w-[48%] py-5"
            >
              <UserX className="mr-2 h-4 w-4" />
              Restrict User
            </Button>
          </div>

          <div>
            {complaint?.type === "POST" && (
              <Button
                variant="destructive"
                onClick={handleRestrictAndDelete}
                className="w-full py-5"
              >
                <Trash2 className="mr-1 h-4 w-4" />
                Restrict & Delete Post
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
