import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface RecommendationCardProps {
  initials: string;
  name: string;
  title: string;
  company: string;
  rating: number;
  testimonial: string;
  timeAgo: string;
}

export function RecommendationCard({
  initials,
  name,
  title,
  company,
  rating,
  testimonial,
  timeAgo,
}: RecommendationCardProps) {
  return (
    <Card className="bg-transparent border-border p-6 max-w-md">
      <CardContent className="p-0 space-y-4">
        {/* Avatar with initials */}
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-muted text-foreground font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* Name and rating */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">{name}</h3>
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i < rating ? "text-yellow-400" : "text-gray-600"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {title} at {company}
          </p>
        </div>

        {/* Testimonial */}
        <blockquote className="text-foreground leading-relaxed">{`"${testimonial}"`}</blockquote>

        {/* Timestamp */}
        <p className="text-sm text-muted-foreground">{timeAgo}</p>
      </CardContent>
    </Card>
  );
}
