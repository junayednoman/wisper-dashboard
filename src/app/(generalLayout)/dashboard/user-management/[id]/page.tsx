import AContainer from "@/components/AContainer";
import { Metadata } from "next";
import { UserDetailsData } from "../_components/UserDetailsData";
import { UserDetailsTabs } from "../_components/tab/UserDetailsTabs";

export const metadata: Metadata = {
  title: "User details",
};

export default async function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <AContainer>
        <UserDetailsData id={id} />
      </AContainer>
      <UserDetailsTabs />
    </>
  );
}
