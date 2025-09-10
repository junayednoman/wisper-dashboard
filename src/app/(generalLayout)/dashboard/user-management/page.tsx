import AContainer from "@/components/AContainer";
import PageTitle from "@/components/others/PageTitle";
import { Metadata } from "next";
import Users from "./_components/Users";

export const metadata: Metadata = {
  title: "User Management",
};

const UserManagement = () => {
  return (
    <main>
      <AContainer>
        <PageTitle
          title="Users Overview"
          subTitle="View and manage all user accounts, track active users, and monitor business registrations for a seamless platform experience."
        />
        <Users />
      </AContainer>
    </main>
  );
};

export default UserManagement;
