import { AccountCard } from "../tabContent/complaints/accounts/AccountCard";

const NewUsers = () => {
  return (
    <div className="mt-6">
      <h3 className="font-bold text-2xl">New Users</h3>
      <div className="space-y-4 mt-4">
        <AccountCard />
        <AccountCard />
        <AccountCard />
      </div>
    </div>
  );
};

export default NewUsers;
