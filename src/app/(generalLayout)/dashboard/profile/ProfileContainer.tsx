"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileHeader from "./ProfileHeader";
import EditProfileForm from "./EditProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { useGetProfileQuery } from "@/redux/api/profileApi";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
const ProfileContainer = () => {
  const [activeTab, setActiveTab] = useState("edit-profile");
  const { data, isLoading, isError, error, refetch } = useGetProfileQuery("");
  console.log("error", error);
  if (isLoading) return <ASpinner size={150} className="py-56" />;
  if (isError)
    return <AErrorMessage className="py-56" error={error} onRetry={refetch} />;

  const profile = data?.data;

  return (
    <div className="min-h-screen bg-card p-6 rounded-lg">
      <div className="max-w-2xl mx-auto space-y-8">
        <ProfileHeader
          name={profile?.name || ""}
          role={"Admin"}
          avatar={profile?.photoUrl || "/placeholder.svg?height=120&width=120"}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-transparent p-0 h-auto">
            <TabsTrigger
              value="edit-profile"
              className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent pb-2 text-primary-foreground text-[16px]"
            >
              Edit Profile
            </TabsTrigger>
            <TabsTrigger
              value="change-password"
              className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent pb-2 text-primary-foreground text-[16px]"
            >
              Change Password
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="edit-profile" className="mt-0">
              <EditProfileForm
                defaultValues={{
                  name: profile?.name || "",
                  email: profile?.email || "",
                  address: profile?.address || "",
                }}
              />
            </TabsContent>

            <TabsContent value="change-password" className="mt-0">
              <ChangePasswordForm />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileContainer;
