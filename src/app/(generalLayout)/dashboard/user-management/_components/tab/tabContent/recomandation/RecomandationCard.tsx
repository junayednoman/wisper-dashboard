"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface RecommendationCardProps {
  initials: string;
  name: string;
  title: string;
  image?: string | null;
  rating: number;
  testimonial: string;
  timeAgo: string;
}

export function RecommendationCard({
  initials,
  name,
  title,
  image,
  rating,
  testimonial,
  timeAgo,
}: RecommendationCardProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <Card className="bg-transparent border-border p-6 max-w-md">
      <CardContent className="p-0 space-y-4">
        {/* Avatar with image fallback */}
        <Avatar className="h-12 w-12">
          {image ? <AvatarImage src={image} alt={name} /> : null}
          <AvatarFallback className="bg-muted text-foreground font-medium text-lg">
            {initials}
          </AvatarFallback>
        </Avatar>
        {/* Name and Rating */}
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-foreground text-lg">{name}</h3>
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, i) => {
                if (i < fullStars) {
                  return (
                    <span key={i} className="text-yellow-500 text-lg">
                      ★
                    </span>
                  );
                }
                if (i === fullStars && hasHalfStar) {
                  return (
                    <span key={i} className="relative text-lg">
                      <span className="text-gray-400">★</span>
                      <span className="absolute left-0 top-0 overflow-hidden w-1/2 text-yellow-500">
                        ★
                      </span>
                    </span>
                  );
                }
                return (
                  <span key={i} className="text-gray-400 text-lg">
                    ★
                  </span>
                );
              })}
              <span className="ml-2 text-sm text-muted-foreground font-medium">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>

        {/* Testimonial */}
        <blockquote className="text-foreground text-[15px] leading-relaxed italic">
          &quot;
          {testimonial}
          &quot;
        </blockquote>
        <p className="text-sm text-muted-foreground">{timeAgo}</p>
      </CardContent>
    </Card>
  );
}
