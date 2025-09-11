"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import UserDetailsPosts from "./tabContent/posts/UserDetailsPosts";
import { Resume } from "./tabContent/resume/Resume";
import AContainer from "@/components/AContainer";
import Recommendations from "./tabContent/recomandation/Recomandationts";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

const tabs: Tab[] = [
  {
    id: "posts",
    label: "Posts",
    content: <UserDetailsPosts />,
  },
  {
    id: "resume",
    label: "Resume",
    content: <Resume />,
  },
  {
    id: "recommendations",
    label: "Recommendations",
    content: <Recommendations />,
  },
];

export function UserDetailsTabs() {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex items-center border-b border-border pl-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative px-6 py-4 text-sm font-medium transition-colors duration-200",
              "hover:text-primary",
              activeTab === tab.id ? "text-primary" : "text-muted-foreground"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AContainer>
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </AContainer>
    </div>
  );
}
