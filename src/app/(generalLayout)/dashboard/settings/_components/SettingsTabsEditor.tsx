"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Save, Check, Loader2 } from "lucide-react";
import JoditTextEditor from "@/components/form/ATextEditor";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
import { useGetLegalQuery, useUpdateLegalMutation } from "@/redux/api/legalApi";
import { toast } from "sonner"; // <-- Added

interface ContentSection {
  id: string;
  title: string;
  content: string;
  field: "aboutUs" | "termsAndConditions" | "privacyPolicy";
}

const SettingsTabsEditor = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [savingStates, setSavingStates] = useState<Record<string, boolean>>({});
  const [savedStates, setSavedStates] = useState<Record<string, boolean>>({});

  const {
    data: legalResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetLegalQuery({ page: 1, limit: 1 });

  const [updateLegal] = useUpdateLegalMutation();

  const legalData = legalResponse?.data;

  const [contentSections, setContentSections] = useState<ContentSection[]>([
    { id: "about", title: "About Us", content: "", field: "aboutUs" },
    {
      id: "terms",
      title: "Terms & Conditions",
      content: "",
      field: "termsAndConditions",
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      content: "",
      field: "privacyPolicy",
    },
  ]);

  useEffect(() => {
    if (legalData) {
      setContentSections([
        {
          id: "about",
          title: "About Us",
          content: legalData.aboutUs || "",
          field: "aboutUs",
        },
        {
          id: "terms",
          title: "Terms & Conditions",
          content: legalData.termsAndConditions || "",
          field: "termsAndConditions",
        },
        {
          id: "privacy",
          title: "Privacy Policy",
          content: legalData.privacyPolicy || "",
          field: "privacyPolicy",
        },
      ]);
    }
  }, [legalData]);

  const handleContentChange = (sectionId: string, content: string) => {
    setContentSections((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, content } : section
      )
    );
    setSavedStates((prev) => ({ ...prev, [sectionId]: false }));
  };

  const handleSave = async (sectionId: string) => {
    if (!legalData) return;

    const section = contentSections.find((s) => s.id === sectionId);
    if (!section) return;

    setSavingStates((prev) => ({ ...prev, [sectionId]: true }));

    const payload = {
      aboutUs:
        section.id === "about" ? section.content : legalData.aboutUs || "",
      termsAndConditions:
        section.id === "terms"
          ? section.content
          : legalData.termsAndConditions || "",
      privacyPolicy:
        section.id === "privacy"
          ? section.content
          : legalData.privacyPolicy || "",
    };

    try {
      await updateLegal(payload).unwrap();
      toast.success(`${section.title} updated successfully!`);

      setSavedStates((prev) => ({ ...prev, [sectionId]: true }));
      setTimeout(() => {
        setSavedStates((prev) => ({ ...prev, [sectionId]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to update legal content:", err);
      toast.error(
        `Failed to save ${section.title.toLowerCase()}. Please try again.`
      );
    } finally {
      setSavingStates((prev) => ({ ...prev, [sectionId]: false }));
    }
  };

  if (isLoading) return <ASpinner size={150} className="py-64" />;

  if (isError)
    return <AErrorMessage error={error} onRetry={refetch} className="py-64" />;

  if (!legalData)
    return (
      <div className="py-64 text-center text-muted-foreground">
        No content found
      </div>
    );

  return (
    <div className="h-screen bg-background flex flex-col">
      <div className="flex-1">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-col"
        >
          <TabsList className="grid w-full grid-cols-3 bg-card h-14">
            <TabsTrigger
              value="about"
              className="data-[state=active]:bg-primary data-[state=active]:text-card"
            >
              About Us
            </TabsTrigger>
            <TabsTrigger
              value="terms"
              className="data-[state=active]:bg-primary data-[state=active]:text-card"
            >
              Terms & Conditions
            </TabsTrigger>
            <TabsTrigger
              value="privacy"
              className="data-[state=active]:bg-primary data-[state=active]:text-card"
            >
              Privacy Policy
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 flex flex-col">
            {contentSections.map((section) => (
              <TabsContent
                key={section.id}
                value={section.id}
                className="flex-1 flex flex-col mt-0"
              >
                <div className="flex-1 flex flex-col">
                  <div className="p-6 border-b border-border">
                    <h1 className="text-2xl font-bold text-foreground">
                      {section.title}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      Edit and manage your {section.title.toLowerCase()} content
                    </p>
                  </div>

                  <div className="flex-1 p-6">
                    <div className="h-fit bg-background border border-border rounded-lg overflow-hidden">
                      <JoditTextEditor
                        content={section.content}
                        onChange={(content) =>
                          handleContentChange(section.id, content)
                        }
                        placeholder={`Enter your ${section.title.toLowerCase()} content here...`}
                      />
                    </div>
                  </div>

                  <div className="p-6 border-t border-border">
                    <div className="flex justify-end">
                      <Button
                        onClick={() => handleSave(section.id)}
                        disabled={
                          savingStates[section.id] || savedStates[section.id]
                        }
                        className="min-w-[140px] gap-2"
                        size="lg"
                      >
                        {savingStates[section.id] ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : savedStates[section.id] ? (
                          <>
                            <Check className="h-4 w-4" />
                            Saved
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsTabsEditor;
