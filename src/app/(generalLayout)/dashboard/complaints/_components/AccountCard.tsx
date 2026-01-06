"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Loader, Lock, LockOpen } from "lucide-react";
import { AccountComplainDetailsModal } from "./modal/AccountDetailsModal";
import { AAlertDialog } from "@/components/others/AAlertDialog";
import { useChangeAccountStatusMutation } from "@/redux/api/userApi";
import handleMutation from "@/utils/handleMutation";
import { useResolveComplaintMutation } from "@/redux/api/complaintApi";

type AccountCardData = {
  id: string;
  accountId: string;
  name: string;
  email: string;
  image: string;
  role: "PERSON" | "BUSINESS";
  reason: string;
  date: string;
  status: string;
  accountStatus: "ACTIVE" | "BLOCKED";
};

export function AccountCard({ data }: { data: AccountCardData }) {
  const [changeStatus, { isLoading }] = useChangeAccountStatusMutation();
  const [resolveComplaint] = useResolveComplaintMutation();

  const handleResolveComplaint = () => {
    handleMutation(data.id, resolveComplaint, "Resolving...");
  };

  const handleBlockUser = () => {
    handleMutation(
      {
        id: data.accountId,
        payload: {
          status: data.accountStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE",
        },
      },
      changeStatus,
      "Changing status...",
      () => {
        handleResolveComplaint();
      }
    );
  };
  const { name, email, image, role, reason, date } = data;

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-border transition-colors">
      <div className="flex items-center gap-4">
        <div
          className="size-13 bg-cover bg-center bg-no-repeat rounded-full mr-2"
          style={{
            backgroundImage: `url(${
              image ||
              "https://static.vecteezy.com/system/resources/previews/024/766/958/non_2x/default-male-avatar-profile-icon-social-media-user-free-vector.jpg"
            })`,
          }}
        ></div>
        <div className="flex flex-col">
          <h3 className="font-medium text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
        <Badge
          variant="default"
          className={`${
            role === "PERSON" ? "bg-primary" : "bg-orange-500"
          } text-white capitalize`}
        >
          {role.toLowerCase()}
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <AccountComplainDetailsModal
          user={{
            name,
            role: role === "PERSON" ? "Person" : "Business",
            avatar: image,
          }}
          complaint={{
            reason,
            date,
            status: data.status,
            type: "ACCOUNT",
          }}
          onRestrict={handleBlockUser}
          onResolve={handleResolveComplaint}
        >
          <Button size="icon" variant="ghost" className="h-9 w-9">
            <Eye className="h-5 w-5" />
          </Button>
        </AccountComplainDetailsModal>
        <AAlertDialog
          actionText={data.accountStatus === "ACTIVE" ? "Block" : "Unblock"}
          title={
            data.accountStatus === "ACTIVE" ? "Block User?" : "Unblock User?"
          }
          description={`Are you sure you want to ${
            data.accountStatus === "ACTIVE" ? "block" : "unblock"
          } the user?`}
          onAction={handleBlockUser}
        >
          <Button
            size="icon"
            className={`w-[36px] h-[36px] ${
              data.accountStatus === "ACTIVE"
                ? "bg-destructive hover:bg-destructive!"
                : "bg-green-600 hover:bg-green-600!"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin" />
            ) : data.accountStatus === "ACTIVE" ? (
              <Lock />
            ) : (
              <LockOpen />
            )}
          </Button>
        </AAlertDialog>
      </div>
    </div>
  );
}
