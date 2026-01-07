"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Loader } from "lucide-react";
import { useDeleteNotificationsMutation } from "@/redux/api/notificationApi";
import { format } from "date-fns";
import handleMutation from "@/utils/handleMutation";

interface NotificationCardProps {
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  notificationId: string;
}

const NotificationCard = ({
  title,
  message,
  timestamp,
  read,
  notificationId,
}: NotificationCardProps) => {
  const [deleteNotification, { isLoading }] = useDeleteNotificationsMutation();

  const handleDelete = async () => {
    handleMutation(
      { ids: [notificationId] },
      deleteNotification,
      "Deleting notification..."
    );
  };

  const formattedDate = format(new Date(timestamp), "MMM d, yyyy 'at' h:mm a");

  return (
    <div
      className={`
      p-6 bg-card rounded-xl border border-border 
      transition-all duration-200 hover:shadow-md
      ${read ? "opacity-80" : "ring-2 ring-primary/20"}
    `}
    >
      <div className="flex items-start justify-between gap-8">
        <div className="flex-1">
          <h6
            className={`
            text-xl text-primary-foreground 
            ${read ? "font-medium" : "font-extrabold"}
          `}
          >
            {title}
          </h6>
          <p
            className={`
            text-primary-foreground mt-1 
            ${read ? "font-normal" : "font-bold"}
          `}
          >
            {message}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">{formattedDate}</p>
        </div>

        <Button
          variant="destructive"
          size="icon"
          onClick={handleDelete}
          disabled={isLoading}
          className="shrink-0 h-10 w-10 rounded-lg"
        >
          {isLoading ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default NotificationCard;
