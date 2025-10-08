import { Bell, Crown, Info, Settings, UserRoundCog, Users } from "lucide-react";

type TNavMain = {
  title: string;
  url: string;
  icon: React.ReactNode;
}[];

export const navItems: TNavMain = [
  {
    title: "User Management",
    url: "/dashboard/user-management",
    icon: <UserRoundCog />,
  },
  {
    title: "Community",
    url: "/dashboard/community",
    icon: <Users />,
  },
  {
    title: "Complaints",
    url: "/dashboard/complaints",
    icon: <Info />,
  },
  {
    title: "Subscription Plans",
    url: "/dashboard/subscription-plans",
    icon: <Crown />,
  },
  {
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: <Bell />,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: <Settings />,
  },
];
