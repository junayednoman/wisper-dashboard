"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import authImg from "@/assets/globe.png";
import logo from "@/assets/logo.svg";

const ForgetPasswordForm = dynamic(() => import("./ForgetPasswordForm"), {
  ssr: false,
});

const ForgotPassword = () => {
  return (
    <main className="mx-auto flex flex-col items-center justify-center">
      <div className="h-screen grid grid-cols-2 w-full">
        <div className="px-20 flex flex-col justify-center">
          <Image
            className="mx-auto"
            src={logo}
            width={230}
            height={230}
            alt="auth"
          />
          <Image
            className="mx-auto mt-14 mb-18"
            src={authImg}
            width={700}
            height={700}
            alt="auth"
          />
          <div className="text-center">
            <h2 className="text-[56px] font-bold">The Future of Hiring</h2>
            <p className="text-secondary-foreground">
              Connecting you with the best jobs in every field, ready to bring
              your dream to life.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <ForgetPasswordForm />
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
