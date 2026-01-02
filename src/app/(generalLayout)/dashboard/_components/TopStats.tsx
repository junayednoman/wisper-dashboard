"use client";
import AErrorMessage from "@/components/AErrorMessage";
import StatCard from "@/components/others/StatCard";
import ASpinner from "@/components/ui/ASpinner";
import { useGetUserStatsQuery } from "@/redux/api/dashboardApi";
import { BriefcaseBusiness, User, Users } from "lucide-react";

const TopStats = () => {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetUserStatsQuery({});
  const stats = data?.data;

  if (isLoading) return <ASpinner className="!bg-card p-6 px-8 rounded-xl" />;
  if (isError) return <AErrorMessage className="!bg-card rounded-xl" onRetry={refetch} />;

  return (
    <section>
      <div className="grid grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          icon={<Users />}
          value={stats?.totalUsers || 0}
        />
        <StatCard
          title="Individuals"
          icon={<User />}
          value={stats?.totalPersons || 0}
        />
        <StatCard
          title="Businesses"
          icon={<BriefcaseBusiness />}
          value={stats?.totalBusinesses || 0}
        />
      </div>
    </section>
  );
};

export default TopStats;
