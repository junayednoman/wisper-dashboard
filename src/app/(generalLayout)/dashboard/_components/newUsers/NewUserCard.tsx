import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function NewUserCard({ data }: { data: any }) {
  const profileData = data?.business || data?.person;
  return (
    <Link
      href={`/dashboard/user-management/${data?.id}`}
      className="flex items-center justify-between p-4 rounded-lg border border-border transition-colors"
    >
      <div className="flex gap-2">
        <div
          className="size-13 bg-cover bg-center bg-no-repeat rounded-full mr-2"
          style={{
            backgroundImage: `url(${
              profileData?.image ||
              "https://static.vecteezy.com/system/resources/previews/024/766/958/non_2x/default-male-avatar-profile-icon-social-media-user-free-vector.jpg"
            })`,
          }}
        ></div>

        <div className="flex flex-col">
          <h3 className="font-medium text-foreground">{profileData?.name}</h3>
          <p className="text-sm text-muted-foreground">{profileData?.email}</p>
        </div>

        <div>
          <Badge
            variant="default"
            className={`${
              data?.role === "PERSON" ? "bg-primary" : "bg-[#FF9F41]"
            } text-white !capitalize`}
          >
            {data?.role}
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
