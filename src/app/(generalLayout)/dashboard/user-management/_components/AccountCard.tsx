import { AAlertDialog } from "@/components/others/AAlertDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Loader, Lock, LockOpen } from "lucide-react";
import { TUser } from "@/interface/user.interface";
import Link from "next/link";
import handleMutation from "@/utils/handleMutation";
import { useChangeAccountStatusMutation } from "@/redux/api/userApi";

interface AccountCardProps {
  user: TUser;
}

export function AccountCard({ user }: AccountCardProps) {
  const [changeStatus, { isLoading }] = useChangeAccountStatusMutation();
  const handleBlockUser = () => {
    handleMutation(
      {
        id: user.id,
        payload: { status: user.status === "ACTIVE" ? "BLOCKED" : "ACTIVE" },
      },
      changeStatus,
      "Changing status..."
    );
  };

  const isPersonal = user.role === "personal" || !!user.person;
  const displayName = isPersonal ? user.person?.name : user.business?.name;
  const displayEmail = isPersonal ? user.person?.email : user.business?.email;
  const displayImage = isPersonal ? user.person?.image : user.business?.image;

  const badgeText = isPersonal ? "Personal" : "Business";
  const badgeVariant = isPersonal ? "default" : "secondary";

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-border transition-colors">
      <div className="flex gap-4 items-center">
        {/* Profile Image */}
        <div
          className="bg-center bg-cover bg-no-repeat rounded-full size-[50px]"
          style={{
            backgroundImage: `url(${
              displayImage ||
              "https://static.vecteezy.com/system/resources/previews/024/766/958/non_2x/default-male-avatar-profile-icon-social-media-user-free-vector.jpg"
            })`,
          }}
        />

        <div className="flex flex-col">
          <h3 className="font-medium text-foreground">{displayName}</h3>
          <p className="text-sm text-muted-foreground">{displayEmail}</p>
        </div>

        <Badge
          variant={badgeVariant}
          className={`${
            user?.role === "PERSON" ? "bg-primary" : "bg-[#FF9F41]"
          } text-white capitalize`}
        >
          {badgeText}
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={`/dashboard/user-management/${user.id}`}
          className="rounded-full"
        >
          <Button size="icon" className="w-[37px] h-[37px]">
            <Eye className="!w-[19px] !h-[19px]" />
          </Button>
        </Link>

        <AAlertDialog
          actionText={user.status === "ACTIVE" ? "Block" : "Unblock"}
          title={user.status === "ACTIVE" ? "Block User?" : "Unblock User?"}
          description={`Are you sure you want to ${
            user.status === "ACTIVE" ? "block" : "unblock"
          } the user?`}
          onAction={handleBlockUser}
        >
          <Button
            size="icon"
            className={`w-[36px] h-[36px] ${
              user.status === "ACTIVE"
                ? "bg-destructive hover:bg-destructive!"
                : "bg-green-600 hover:bg-green-600!"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin" />
            ) : user.status === "ACTIVE" ? (
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
