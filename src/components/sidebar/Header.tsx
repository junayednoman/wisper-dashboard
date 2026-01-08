"use client";

import Link from "next/link";
import { SidebarTrigger } from "../ui/sidebar";
import { Bell } from "lucide-react";
import ProfileDropdown from "@/app/(generalLayout)/sections/dashboard/ProfileDropdown";
import { useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks/hooks";
import { selectUser } from "@/redux/slice/authSlice";
import { useGetUnseenNotificationCountQuery } from "@/redux/api/notificationApi";

const Header = () => {
  const tokenUser = useAppSelector(selectUser) as any;

  const {
    data,
    isLoading: isCountLoading,
    refetch,
  } = useGetUnseenNotificationCountQuery(undefined, {
    pollingInterval: 60000,
    refetchOnMountOrArgChange: true,
  });

  const unseenCount = data?.data || 0;

  const socket = useSocket();

  useEffect(() => {
    if (!socket || !tokenUser?._id) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.on(`notification::${tokenUser._id}`, (newNotification: any) => {
      toast.info(newNotification.message || "You have a new notification", {
        duration: 5000,
      });

      refetch();
    });

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.off(`notification::${tokenUser._id}`);
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket, tokenUser, refetch]);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-0 right-0 z-50 bg-sidebar">
      <div className="flex items-center justify-between gap-2 px-4 w-full">
        <SidebarTrigger className="-ml-1 !text-foreground hover:!text-sidebar" />

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/notifications"
            className="bg-secondary p-2 rounded-full flex items-center gap-2 relative"
          >
            <Bell size={23} className="text-primary" />

            {/* Notification Badge */}
            {!isCountLoading && unseenCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full min-w-[20px] h-[20px] flex items-center justify-center animate-pulse">
                {unseenCount > 99 ? "99+" : unseenCount}
              </div>
            )}
          </Link>

          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
