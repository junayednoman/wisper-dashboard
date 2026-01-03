import { useGetUsersQuery } from "@/redux/api/userApi";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
import { NewUserCard } from "./NewUserCard";

const NewUsers = () => {
  const { data, isLoading, isError, error, refetch } = useGetUsersQuery({
    page: 1,
    limit: 3,
  });

  const users = data?.data?.auths || [];

  if (isLoading) {
    return <ASpinner className="flex justify-center items-center h-[300px]" />;
  }

  if (isError) {
    return (
      <AErrorMessage
        error={error}
        className="flex justify-center items-center h-[300px]"
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="mt-6">
      <h3 className="font-bold text-2xl">New Users</h3>
      <div className="space-y-3 mt-4">
        {users?.map((user: any) => (
          <NewUserCard data={user} key={user.index} />
        ))}
      </div>
    </div>
  );
};

export default NewUsers;
