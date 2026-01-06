import AContainer from "@/components/AContainer";
import { Metadata } from "next";
import { UserDetailsData } from "../_components/UserDetailsData";
import { UserDetailsTabs } from "../_components/tab/UserDetailsTabs";

export const metadata: Metadata = {
  title: "User details",
};

const UserDetailsPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return (
    <>
      <AContainer>
        <UserDetailsData id={id} />
      </AContainer>
      <UserDetailsTabs />
    </>
  );
};

export default UserDetailsPage;
