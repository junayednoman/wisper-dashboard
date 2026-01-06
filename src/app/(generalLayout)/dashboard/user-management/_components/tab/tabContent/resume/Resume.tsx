"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { format } from "date-fns";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
import { useGetResumesQuery } from "@/redux/api/resumeApi";
import { usePathname } from "next/navigation";

type ResumeData = {
  id: string;
  name: string;
  file: string;
  fileSize: string;
  createdAt: string;
};

export function Resume() {
  const path = usePathname();
  const id = path?.split("user-management/")[1];
  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetResumesQuery(id);

  const resumes: ResumeData[] = response?.data || [];

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="w-full py-30">
        <ASpinner size={100} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full py-30">
        <AErrorMessage error={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 grid grid-cols-3 gap-6">
      {resumes.length > 0 ? (
        <div className="space-y-4">
          {resumes.map((resume) => {
            const uploadedDate = format(
              new Date(resume.createdAt),
              "MMMM d, yyyy"
            );

            return (
              <Card key={resume.id} className="overflow-hidden border-border">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* PDF Icon */}
                      <div className="relative flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
                        <FileText className="h-6 w-6 text-white" />
                      </div>

                      {/* File Info */}
                      <div>
                        <h3 className="font-medium text-foreground text-lg">
                          {resume.name.replace(".pdf", "")}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{resume.fileSize}</span>
                          <span>•</span>
                          <span>Uploaded {uploadedDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Download Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => handleDownload(resume.file, resume.name)}
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-dashed border-2 border-muted-foreground/30">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No resume uploaded yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
