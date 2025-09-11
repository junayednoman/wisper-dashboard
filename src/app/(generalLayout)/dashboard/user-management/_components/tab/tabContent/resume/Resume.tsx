import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

export function Resume() {
  return (
    <div className="w-full max-w-2xl space-y-6">
      {/* Introduction text */}
      <p className="text-foreground leading-relaxed">
        Hey! I&apos;m a seasoned full-stack engineer with over 7 years of
        hands-on experience building scalable web and mobile applications from
        the ground up.
      </p>

      {/* Resume download card */}
      <Card className="py-2">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* PDF icon */}
              <div className="flex items-center justify-center w-10 h-10 bg-red-600 rounded">
                <FileText className="h-5 w-5 text-white" />
                <span className="absolute text-xs font-bold text-white mt-1">
                  PDF
                </span>
              </div>

              {/* File info */}
              <div className="flex flex-col gap-1">
                <h3 className="font-medium text-lg text-white">
                  Resume wade adeoye 20_89_4
                </h3>
                <p className="text-sm text-gray-400">PDF Document 306kb</p>
              </div>
            </div>

            {/* Download button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Download size={30} className="text-secondary" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
