"use client";

import NotificationCard from "./NotificationCard";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
import {
  useGetNotificationsQuery,
  useSeenNotificationsMutation,
  useDeleteNotificationsMutation,
} from "@/redux/api/notificationApi";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import handleMutation from "@/utils/handleMutation";

const NotificationContainer = () => {
  const increment = 6;
  const [limit, setLimit] = useState<number>(increment);

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetNotificationsQuery({ limit });

  const [markAllAsRead, { isLoading: isMarkingAll }] =
    useSeenNotificationsMutation();
  const [deleteAll, { isLoading: isDeletingAll }] =
    useDeleteNotificationsMutation();

  const notifications = response?.data?.notifications || [];
  const totalItems = response?.data?.meta?.total || 0;

  const handleMarkAllAsRead = async () => {
    const ids = notifications.map((n: any) => n.id);
    if (ids.length === 0) return;
    handleMutation({ ids }, markAllAsRead, "Marking all as read...");
  };

  const handleDeleteAll = async () => {
    const ids = notifications.map((n: any) => n.id);
    if (ids.length === 0) return;

    handleMutation({ ids }, deleteAll, "Deleting all notifications...");
  };

  const handleLoadMore = () => {
    setLimit((prev) => prev + increment);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <ASpinner size={150} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <AErrorMessage error={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-foreground text-3xl font-bold">Notifications</h1>

        {notifications.length > 0 && (
          <div className="flex gap-3">
            <Button
              size="lg"
              variant="outline"
              disabled={isMarkingAll}
              onClick={handleMarkAllAsRead}
            >
              {isMarkingAll ? "Marking..." : "Mark all as read"}
            </Button>
            <Button
              size="lg"
              variant="destructive"
              disabled={isDeletingAll}
              onClick={handleDeleteAll}
            >
              {isDeletingAll ? "Deleting..." : "Delete All"}
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification: any) => (
            <NotificationCard
              key={notification.id}
              title={notification.title}
              message={notification.body}
              timestamp={notification.date}
              read={notification.hasSeen}
              notificationId={notification.id}
            />
          ))
        ) : (
          <div className="text-center py-32 text-muted-foreground">
            <p className="text-xl">No notifications found</p>
            <p className="mt-2">You&apos;re all caught up!</p>
          </div>
        )}
      </div>

      {/* Load More */}
      {notifications.length > 0 && notifications.length < totalItems && (
        <div className="mt-10 flex justify-center">
          <Button
            size="lg"
            onClick={handleLoadMore}
            disabled={isFetching}
            className="px-8"
          >
            {isFetching ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationContainer;
