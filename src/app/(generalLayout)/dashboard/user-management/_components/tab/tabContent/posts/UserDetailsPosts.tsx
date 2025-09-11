import { UserDetailsPostCard } from "./UserDetailsPostCard";

const UserDetailsPosts = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <UserDetailsPostCard />
      <UserDetailsPostCard />
      <UserDetailsPostCard />
      <UserDetailsPostCard />
    </div>
  );
};

export default UserDetailsPosts;
