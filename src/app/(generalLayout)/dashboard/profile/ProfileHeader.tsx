"use client";

import { useRef } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import avatarImg from "@/assets/avatar.png";
import handleMutation from "@/utils/handleMutation";
import { useUpdateProfileMutation } from "@/redux/api/profileApi";

interface ProfileHeaderProps {
  name: string;
  role: string;
  avatar?: string;
}

const ProfileHeader = ({ name, role, avatar }: ProfileHeaderProps) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      console.error("Invalid file type. Please upload JPEG, PNG, or JPG.");
      return;
    }

    if (file.size > maxSize) {
      console.error("File size exceeds 5MB.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    handleMutation(formData, updateProfile, "Uploading image...");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Image
            src={avatar || avatarImg}
            alt={name}
            width={120}
            height={120}
            className="rounded-full object-cover border-4 border-background"
          />
          <Button
            size="icon"
            className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
            onClick={handleEditClick}
            disabled={isLoading}
          >
            <Edit className="h-5 w-5" />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleFileChange}
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary-foreground">{name}</h2>
          <p className="text-lg text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
