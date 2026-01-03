import { AAlertDialog } from "@/components/others/AAlertDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Lock } from "lucide-react";
import { TUser } from "@/interface/user.interface";
import { AccountDetailsModalModal } from "./modal/AccountDetailsModal";

interface AccountCardProps {
  user: TUser;
}

export function AccountCard({ user }: AccountCardProps) {
  const handleDelete = () => {
    console.log("Restrict/Delete user:", user.id);
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
              displayImage || "https://randomuser.me/api/portraits/men/23.jpg"
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
        <AccountDetailsModalModal
          user={{
            name: displayName || "Unknown",
            role: user.role,
            avatar: displayImage || "",
          }}
          post={{
            content: "Sample reported post content...",
            stats: "◉ 10K Views • 30 mins",
          }}
          reasons={[
            "Just to let you know this might be a problem",
            "Disrespectful and harmful behavior",
            "Violating platform's harassment policy",
          ]}
          onRestrict={() => console.log("User restricted")}
          onRestrictDelete={() => console.log("User restricted & post deleted")}
        >
          <Button size="icon" className="w-[37px] h-[37px]">
            <Eye className="!w-[19px] !h-[19px]" />
          </Button>
        </AccountDetailsModalModal>

        <AAlertDialog
          title="Restrict User?"
          description="This will restrict the user's account. Are you sure?"
          onAction={handleDelete}
        >
          <Button
            variant="destructive"
            size="icon"
            className="w-[36px] h-[36px]"
          >
            <Lock />
          </Button>
        </AAlertDialog>
      </div>
    </div>
  );
}
