"use client";
import { Card, CardContent } from "@/components/ui/card";
import { TComplaint } from "@/interface/post.interface";
import { formatDistanceToNow } from "date-fns";
import { Eye } from "lucide-react";
import Link from "next/link";

export default function ComplaintPostCard({
  complaint,
}: {
  complaint: TComplaint;
}) {
  return (
    <div className="!w-[100%]">
      <Card className="rounded-xl bg-transparent shadow-lg border py-6 px-4 pb-4">
        <Link href={`/dashboard/complaints/${complaint.id}`}>
          <div className="flex items-center">
            {/* Profile Image */}
            <div
              className="bg-cover bg-no-repeat bg-center h-13 w-13 rounded-full mr-3"
              style={{
                backgroundImage: `url(${
                  complaint.post.author.business?.image ||
                  complaint.post.author.person?.image ||
                  "https://static.vecteezy.com/system/resources/previews/024/766/958/non_2x/default-male-avatar-profile-icon-social-media-user-free-vector.jpg"
                })`,
              }}
            ></div>
            {/* Author Info */}
            <div>
              <h3 className="text-lg text-secondary font-semibold">
                {complaint.post.author.person?.name ||
                  complaint.post.author.business?.name}
              </h3>
              <p className="text-sm text-gray-400 font-semibold">
                {complaint.post.author.person?.title ||
                  complaint.post.author.business?.industry}
              </p>
            </div>
          </div>
        </Link>
        <Link href={`/dashboard/complaints/${complaint.id}`}>
          <CardContent className="px-0">
            <p className="text-secondary text-sm">
              {complaint.post.caption.length > 175
                ? complaint.post.caption.slice(0, 175) + "..."
                : complaint.post.caption}
            </p>
          </CardContent>
        </Link>
        <Link href={`/dashboard/complaints/${complaint.id}`}>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Eye size={18} /> <span>{complaint.post.views} Views</span>
            </div>
            {formatDistanceToNow(new Date(complaint.post.createdAt), {
              addSuffix: true,
            })}
          </div>
        </Link>
      </Card>
    </div>
  );
}
