"use client";

import * as z from "zod";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import AForm from "@/components/form/AForm";
import { AInput } from "@/components/form/AInput";
import { forgetPasswordValidation } from "@/validations/auth.validation";
import { Button } from "@/components/ui/button";
import handleMutation from "@/utils/handleMutation";
import { useForgetPasswordMutation } from "@/redux/api/authApi";

const ForgetPasswordForm = () => {
  const [forgotPassword, { isLoading }] = useForgetPasswordMutation();
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof forgetPasswordValidation>) => {
    const payload = { email: data.email };
    const onSuccess = () => {
      router.push(`/auth/verify-otp?email=${encodeURIComponent(data.email)}`);
    };

    handleMutation(payload, forgotPassword, "Sending otp ...", onSuccess);
  };

  return (
    <div className="w-[600px] bg-card rounded-2xl p-8 py-10 pt-0">
      <div className="my-8">
        <Button
          type="button"
          variant="link"
          className="text-card-foreground p-0 h-auto text-lg font-medium"
        >
          <Link href="/auth/login" className="flex items-center gap-3">
            <ArrowLeft className="!w-5 !h-5" />
            <span>Back to login</span>
          </Link>
        </Button>
      </div>

      <div className="mb-20 text-center">
        <h1 className="text-[32px] font-bold mb-2">Forgot Password</h1>
        <p className="text-card-foreground text-sm mx-16">
          Please provide the email address associated with your account, and
          we’ll send you verification code to reset your password.
        </p>
      </div>

      {/* Form */}
      <AForm schema={forgetPasswordValidation} onSubmit={onSubmit}>
        <AInput
          placeholder="Enter your email"
          name="email"
          label="Email address"
          type="email"
          required
        />

        <Button disabled={isLoading} type="submit" className="h-12 w-full">
          {isLoading ? "Sending..." : "Send Code"}
        </Button>
      </AForm>
    </div>
  );
};

export default ForgetPasswordForm;
