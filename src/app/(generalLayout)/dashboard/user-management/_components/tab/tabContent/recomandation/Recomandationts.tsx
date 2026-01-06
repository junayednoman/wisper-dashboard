"use client";

import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
import { useGetUserRecommendationsQuery } from "@/redux/api/userApi";
import { RecommendationCard } from "./RecomandationCard";
import { usePathname } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

const Recommendations = () => {
  const path = usePathname();
  const id = path?.split("user-management/")[1];
  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUserRecommendationsQuery(id);

  const recommendations = response?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center py-30">
        <ASpinner size={100} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center py-30">
        <AErrorMessage error={error} onRetry={refetch} />
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="text-center py-30">
        <p className="text-lg text-muted-foreground">No recommendations yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {recommendations.map((rec: any) => {
        const giver = rec.giver.person || rec.giver.business;
        const name = giver?.name || "Anonymous";
        const title = giver?.title || giver.industry || "";
        const image = giver?.image || null;
        const initials = name
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);

        const timeAgo = formatDistanceToNow(new Date(rec?.createdAt), {
          addSuffix: true,
        });

        return (
          <RecommendationCard
            key={rec.id}
            initials={initials}
            name={name}
            title={title}
            image={image}
            rating={rec.rating}
            testimonial={rec.text}
            timeAgo={timeAgo}
          />
        );
      })}
    </div>
  );
};

export default Recommendations;
