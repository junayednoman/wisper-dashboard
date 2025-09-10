// components/PostCard.js
import { TPost } from "@/interface/post.interface";
import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PostCard({ post }: { post: TPost }) {
  return (
    <Link href={"/"} className="flex justify-center">
      <Card className="rounded-xl bg-transparent shadow-lg border py-6 px-4 pb-4">
        <div className="flex items-center">
          {/* Profile Image */}
          <Image
            src={post.profileImage}
            alt={post.authorName}
            width={50}
            height={50}
            className="rounded-full mr-3"
          />
          {/* Author Info */}
          <div>
            <h3 className="text-lg text-secondary font-semibold">
              {post.authorName}
            </h3>
            <p className="text-sm text-gray-400 font-semibold">
              {post.authorRole}
            </p>
          </div>
        </div>
        <CardContent className="px-0">
          <p className="text-secondary text-sm">{post.description}</p>
        </CardContent>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Eye size={18} /> <span>{post.views} Views</span>
          </div>
          <span>{post.timeAgo}</span>
        </div>
      </Card>
    </Link>
  );
}
