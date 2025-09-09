"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import * as z from "zod";

import AForm from "@/components/form/AForm";
import { AInput } from "@/components/form/AInput";
import { Button } from "@/components/ui/button";

import { loginSchema } from "@/validations/auth.validation";
import { useLoginMutation } from "@/redux/api/authApi";
import { setUser } from "@/redux/slice/authSlice";
import handleMutation from "@/utils/handleMutation";
import { ACheckbox } from "@/components/form/ACheckbox";
import Link from "next/link";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { TDecodedUser } from "@/interface/global.interface";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const onSuccess = (res: any) => {
    const decodedUser = jwtDecode(res.data.accessToken) as TDecodedUser;
    if (decodedUser?.role !== "admin")
      return toast.warning("User does not have the required role (admin)", {
        duration: 7000,
      });
    dispatch(setUser({ user: decodedUser, token: res.data.accessToken }));
    router.push(redirectUrl);
  };

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    console.log("data", data);
    const { email, password } = data;
    await handleMutation(
      { email, password },
      login,
      "Logging in...",
      onSuccess
    );
  };

  return (
    <div className="w-[600px] bg-card rounded-2xl p-8 py-10">
      <div className="mb-20 text-center">
        <h1 className="text-[32px] font-bold mb-2">Login To Your Account</h1>
        <p className="text-card-foreground text-sm mx-24">
          Please log in to manage your dashboard and access all your
          administrative tools
        </p>
      </div>

      <AForm
        schema={loginSchema}
        defaultValues={{
          email: "junayednoman05@gmail.com",
          password: "newpass",
          rememberPassword: false,
        }}
        onSubmit={onSubmit}
      >
        <AInput name="email" label="Email address" type="email" required />
        <AInput name="password" label="Password" type="password" required />

        <div className="flex items-center justify-between">
          <ACheckbox label="Remember password" name="rememberPassword" />
          <div className="text-right">
            <Link href={"/auth/forgot-password"}>
              <Button
                type="button"
                variant="link"
                className="text-primary p-0 h-auto font-normal"
              >
                Forgot Password
              </Button>
            </Link>
          </div>
        </div>

        <Button disabled={isLoading} type="submit" className="h-12 w-full">
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </AForm>
    </div>
  );
};

export default LoginForm;
