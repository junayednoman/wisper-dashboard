import { Badge } from "@/components/ui/badge";
import { TCommunity } from "@/interface/community.interface";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function CommunityCard({
  community,
  communityType,
}: {
  community: TCommunity;
  communityType: string;
}) {
  return (
    <Link
      href={`/dashboard/community/${community.id}`}
      className="flex items-center justify-between p-4 rounded-lg border border-border  transition-colors"
    >
      <div className="flex gap-2">
        {/* Profile Image */}
        <div
          className="size-13 bg-cover bg-center bg-no-repeat rounded-full mr-1"
          style={{
            backgroundImage: `url(${
              community.image || "https://i.postimg.cc/zGr81PKy/group-icon.png"
            })`,
          }}
        ></div>

        <div className="flex flex-col">
          {community.name}
          <p className="text-sm text-muted-foreground">
            {community.chat._count.participants} members
          </p>
        </div>

        <div>
          <Badge
            variant="default"
            className={` ${
              communityType === "group" ? "bg-primary" : "bg-[#FF9F41]"
            } text-white`}
          >
            {communityType === "group" ? "Group" : "Class"}
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <p className="text-sm font-medium">Details</p>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </Link>
  );
}
