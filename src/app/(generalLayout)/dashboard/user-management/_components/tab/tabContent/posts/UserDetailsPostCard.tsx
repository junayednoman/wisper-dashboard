"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Eye, Clock } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { TPost } from "@/interface/post.interface";

export function UserDetailsPostCard({ post }: { post: TPost }) {
  const authorName =
    post.author.person?.name || post.author.business?.name || "Unknown";
  const authorImage =
    post.author.person?.image || post.author.business?.image || null;
  const authorTitle = post.author.person?.title || null;

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });

  // Handle different image counts
  const renderImages = () => {
    if (post.images.length === 0) {
      return null;
    }

    if (post.images.length === 1) {
      return (
        <div className="relative h-64">
          <Image
            src={post.images[0]}
            alt="Post image"
            fill
            className="object-cover"
          />
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 h-64">
        {post.images.slice(0, 2).map((img, idx) => (
          <div key={idx} className="relative overflow-hidden">
            <Image
              src={img}
              alt={`Post image ${idx + 1}`}
              fill
              className="object-cover"
            />
            {idx === 1 && post.images.length > 2 && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  +{post.images.length - 2}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      <CardContent className="p-0 flex flex-col flex-grow">
        {/* Images Section - No padding at all */}
        {renderImages()}

        {/* Content Section - Only horizontal padding, NO top/bottom */}
        <div className="px-4 flex flex-col flex-grow space-y-4">
          {/* Author Info */}
          <div className="flex items-center gap-3 py-3">
            {/* Minimal vertical spacing */}
            <div className="relative size-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              {authorImage ? (
                <Image
                  src={authorImage}
                  alt={authorName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600 text-xs">
                    {authorName.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div className="min-w-0">
              <h4 className="font-medium text-sm truncate">{authorName}</h4>
              {authorTitle && (
                <p className="text-xs text-muted-foreground truncate">
                  {authorTitle}
                </p>
              )}
            </div>
          </div>

          {/* Caption */}
          <p className="text-sm text-foreground flex-grow line-clamp-3 -mt-2">
            {post.caption || "No caption"}
          </p>

          {/* Engagement Metrics - Always at bottom, no extra bottom padding */}
          <div className="flex justify-between items-center text-muted-foreground text-xs pb-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>
                {post.views > 1000
                  ? `${(post.views / 1000).toFixed(1)}K`
                  : post.views}{" "}
                Views
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
