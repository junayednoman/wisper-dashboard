import AContainer from "@/components/AContainer";
import { Metadata } from "next";
import { UserDetailsData } from "../_components/UserDetailsData";
import { UserDetailsTabs } from "../_components/tab/UserDetailsTabs";

export const metadata: Metadata = {
  title: "User details",
};

const UserDetailsPage = () => {
  return (
    <>
      <AContainer>
        <UserDetailsData />
      </AContainer>
      <UserDetailsTabs />
    </>
  );
};

export default UserDetailsPage;
