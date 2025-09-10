import type React from "react";
import { MapPin } from "lucide-react";
import Link from "next/link";

interface JobCardProps {
  title?: string;
  company?: string;
  salary?: string;
  icon?: React.ReactNode;
}

export function JobCard({
  title = "Senior UI/UX Designer",
  company = "Canonical",
  salary = "₦240,000/MO",
  icon,
}: JobCardProps) {
  return (
    <Link
      href={"/"}
      className="flex items-center justify-between p-4 bg-card rounded-lg border  transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-orange-500 rounded-full">
          {icon || <MapPin className="h-5 w-5 text-white" />}
        </div>

        <div className="flex flex-col">
          <h3 className="font-medium text-white">{title}</h3>
          <p className="text-sm text-gray-400">{company}</p>
        </div>
      </div>

      <div className="text-white font-medium">{salary}</div>
    </Link>
  );
}
