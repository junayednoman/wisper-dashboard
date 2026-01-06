"use client";
import AErrorMessage from "@/components/AErrorMessage";
import ASpinner from "@/components/ui/ASpinner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { format } from "date-fns";
import { MapPin, Calendar, Mail } from "lucide-react";

export function UserDetailsData({ id }: { id: string }) {
  const { data, isLoading, isError, error, refetch } = useGetSingleUserQuery(
    id,
    {
      skip: !id,
    }
  );
  const user = data?.data || null;
  const profileData = user?.business || user?.person;

  if (isLoading) {
    return (
      <div className="w-full max-w-md bg-card border border-gray-700 py-15 px-8 rounded-xl">
        <ASpinner size={110} />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full max-w-md bg-card border border-gray-700 py-5 px-8 rounded-xl">
        <AErrorMessage error={error} onRetry={refetch} />
      </div>
    );
  }
  if (!user) {
    return (
      <div className="w-full max-w-md bg-card border border-gray-700 py-24 text-center px-8 rounded-xl">
        <p className="text-muted-foreground">No user found</p>
      </div>
    );
  }
  return (
    <Card className="w-full max-w-md border-gray-700">
      <CardContent className="p-6 px-8">
        <div className="flex items-center gap-12">
          {/* Avatar */}
          <div className="text-center flex items-center gap-4 flex-col">
            <div
              className="size-15 bg-cover bg-center bg-no-repeat rounded-full mr-2"
              style={{
                backgroundImage: `url(${
                  profileData?.image ||
                  "https://static.vecteezy.com/system/resources/previews/024/766/958/non_2x/default-male-avatar-profile-icon-social-media-user-free-vector.jpg"
                })`,
              }}
            ></div>
            {/* Name and title */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-1">
                {profileData?.name || "N/A"}
              </h2>
              <p className="text-gray-400 text-sm">
                {profileData?.title || profileData?.industry || "N/A"}
              </p>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 space-y-4">
            {/* Header with badge */}
            <div className="flex">
              <Badge className="bg-primary text-white text-sm p-1 px-2">
                {user?.role}
              </Badge>
            </div>

            {/* Info items */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="h-4 w-4" />
                <span>{profileData?.address || "N/A"}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Calendar className="h-4 w-4" />
                <span>{format(user?.createdAt, "dd MMMM, yyyy")}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="h-4 w-4" />
                <span>{user?.email}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
