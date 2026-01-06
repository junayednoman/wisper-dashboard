"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Image from "next/image";
import { AccountComplainDetailsModal } from "./modal/AccountDetailsModal";
import { AAlertDialog } from "@/components/others/AAlertDialog";
import handleMutation from "@/utils/handleMutation";
import { useResolveComplaintMutation } from "@/redux/api/complaintApi";
import { useChangeAccountStatusMutation } from "@/redux/api/userApi";
import { TBusiness, TPerson } from "@/interface/user.interface";
import { useDeletePostMutation } from "@/redux/api/postApi";

type PostCardData = {
  id: string;
  postId: string;
  author: {
    id: string;
    role: "PERSON" | "BUSINESS";
    status: "ACTIVE" | "BLOCKED";
    person?: TPerson;
    business?: TBusiness;
  };
  description: string;
  views: string;
  timeAgo: string;
  imageUrl: string;
  imageAlt?: string;
  complaintId: string;
  reason: string;
  status: string;
};

export function ComplainPostCard({ data }: { data: PostCardData }) {
  const {
    description,
    views,
    timeAgo,
    imageUrl,
    imageAlt = "Reported post",
    reason,
  } = data;
  const [changeStatus] = useChangeAccountStatusMutation();
  const [resolveComplaint] = useResolveComplaintMutation();
  const [deletePost, { isLoading }] = useDeletePostMutation();
  const handleResolveComplaint = () => {
    handleMutation(data?.id, resolveComplaint, "Resolving...");
  };

  const handleBlockUser = () => {
    handleMutation(
      {
        id: data?.author?.id,
        payload: {
          status: data?.author?.status === "ACTIVE" ? "BLOCKED" : "ACTIVE",
        },
      },
      changeStatus,
      "Changing status...",
      () => {
        handleResolveComplaint();
      }
    );
  };

  const handleDelete = () => {
    handleMutation(data?.postId, deletePost, "Deleting post...", () => {
      handleResolveComplaint();
    });
  };

  const handleRestrictAndDelete = () => {
    handleMutation(data?.postId, deletePost, "Deleting post...", () => {
      handleBlockUser();
    });
  };

  return (
    <Card className="overflow-hidden border-border shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Post Image */}
      <div className="relative aspect-[4/3] w-full bg-muted">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Caption */}
      <CardContent className="p-4 pb-2">
        <p className="text-sm text-foreground line-clamp-3 leading-relaxed">
          {description || "No caption"}
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex flex-col gap-4 p-4 pt-0">
        {/* Stats */}
        <div className="flex w-full items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>{views}</span>
          </div>
          <span>{timeAgo}</span>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 w-full">
          {/* View Details Modal */}
          <AccountComplainDetailsModal
            user={{
              name:
                data?.author?.person?.name ||
                data?.author?.business?.name ||
                "Unknown User",
              role: data?.author?.role || "User",
              avatar:
                data?.author?.business?.image ||
                data?.author?.person?.image ||
                "",
            }}
            complaint={{
              reason,
              date: timeAgo,
              status: data?.status,
              type: "POST",
            }}
            onRestrict={handleBlockUser}
            onRestrictAndDelete={handleRestrictAndDelete}
            onResolve={handleResolveComplaint}
          >
            <Button variant="outline" className="w-full h-11 font-medium">
              View Details
            </Button>
          </AccountComplainDetailsModal>

          {/* Remove Post */}
          <AAlertDialog
            title="Remove Post?"
            description="This will permanently delete the post and notify the user. This action cannot be undone."
            actionText="Remove Post"
            onAction={handleDelete}
          >
            <Button
              disabled={isLoading}
              variant="destructive"
              className="w-full h-11 font-medium"
            >
              {isLoading ? "Removing..." : "Remove Post"}
            </Button>
          </AAlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
}
