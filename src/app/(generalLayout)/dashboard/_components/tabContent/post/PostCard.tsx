"use client";
import { Card, CardContent } from "@/components/ui/card";
import { TPost } from "@/interface/post.interface";
import { formatDistanceToNow } from "date-fns";
import { Eye } from "lucide-react";
import Link from "next/link";

export default function PostCard({ post }: { post: TPost }) {
  return (
    <div className="!w-[100%]">
      <Card className="rounded-xl bg-transparent shadow-lg border py-6 px-4 pb-4">
        <Link href={`/dashboard/complaints/${post.id}`}>
          <div className="flex items-center">
            {/* Profile Image */}
            <div
              className="bg-cover bg-no-repeat bg-center h-13 w-13 rounded-full mr-3"
              style={{
                backgroundImage: `url(${
                  post.author.business?.image ||
                  post.author.person?.image ||
                  "https://static.vecteezy.com/system/resources/previews/024/766/958/non_2x/default-male-avatar-profile-icon-social-media-user-free-vector.jpg"
                })`,
              }}
            ></div>
            {/* Author Info */}
            <div>
              <h3 className="text-lg text-secondary font-semibold">
                {post.author.person?.name || post.author.business?.name}
              </h3>
              <p className="text-sm text-gray-400 font-semibold">
                {post.author.person?.title || post.author.business?.industry}
              </p>
            </div>
          </div>
        </Link>
        <Link href={`/dashboard/complaints/${post.id}`}>
          <CardContent className="px-0">
            <p className="text-secondary text-sm">
              {post.caption.length > 175
                ? post.caption.slice(0, 175) + "..."
                : post.caption}
            </p>
          </CardContent>
        </Link>
        <Link href={`/dashboard/complaints/${post.id}`}>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Eye size={18} /> <span>{post.views} Views</span>
            </div>
            <span>
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </Link>
      </Card>
    </div>
  );
}
