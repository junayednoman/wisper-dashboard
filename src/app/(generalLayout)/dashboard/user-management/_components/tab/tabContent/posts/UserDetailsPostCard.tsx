import { Card, CardContent } from "@/components/ui/card";
import { Eye, Clock } from "lucide-react";
import Image from "next/image";

export function UserDetailsPostCard() {
  return (
    <Card className="w-full max-w-lg mx-auto overflow-hidden py-0">
      <CardContent className="p-0">
        {/* Dual Images Section */}
        <div className="grid grid-cols-2 h-64">
          {/* Left Image - Lifestyle/Inspirational */}
          <div className="relative overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/person-in-blue-tank-top-with-arms-outstretched-aga-pKcdp5SoszcFHLcWaSU869AyD401hL.jpg"
              alt="Professional headshot"
              height={1000}
              width={1000}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Image - Professional Headshot */}
          <div className="relative overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/professional-headshot-of-black-man-in-glasses-suit-NqQ0ky8wGkXWtmklSK16vWqzlaKMFt.jpg"
              alt="Professional headshot"
              height={1000}
              width={1000}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Job Description Section */}
        <div className="p-4">
          <div className="mb-6">
            <p className="text-white leading-relaxed text-sm">
              We are seeking a Senior UI/UX Designer to lead the design of
              intuitive and user-centric mobile applications. The ideal
              candidate should have a strong bac mobile applications.
            </p>
          </div>

          {/* Engagement Metrics */}
          <div className="flex justify-between items-center text-gray-400">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span className="text-sm">105K Views</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">30 mins</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
