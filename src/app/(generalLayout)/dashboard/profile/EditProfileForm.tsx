"use client";

import { Button } from "@/components/ui/button";
import { AInput } from "@/components/form/AInput";
import AForm from "@/components/form/AForm";
import {
  EditProfileFormValues,
  editProfileSchema,
} from "@/validations/profile.validation";
import handleMutation from "@/utils/handleMutation";
import { useUpdateProfileMutation } from "@/redux/api/profileApi";

interface EditProfileFormProps {
  defaultValues?: Partial<EditProfileFormValues>;
}

const EditProfileForm = ({ defaultValues }: EditProfileFormProps) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleEditProfile = (data: EditProfileFormValues) => {
    const payload = {
      name: data.name,
      phone: data.phone || null,
    };

    handleMutation(payload, updateProfile, "Updating profile...");
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-primary-foreground text-center">
        Edit Your Profile
      </h3>

      <AForm<EditProfileFormValues>
        schema={editProfileSchema}
        defaultValues={defaultValues as EditProfileFormValues | undefined}
        onSubmit={handleEditProfile}
      >
        <AInput
          name="name"
          label="User Name"
          placeholder="Enter your name"
          required
        />
        <AInput
          name="email"
          label="Email"
          type="email"
          disabled
          placeholder="Enter your email"
          required
        />
        <AInput
          name="phone"
          label="Phone Number"
          placeholder="Enter your phone number"
        />
        <Button disabled={isLoading} type="submit" className="w-full h-[50px]">
          {isLoading ? "Updating..." : "Update Profile"}
        </Button>
      </AForm>
    </div>
  );
};

export default EditProfileForm;