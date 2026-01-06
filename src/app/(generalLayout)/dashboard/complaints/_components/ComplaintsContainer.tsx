"use client";

import AContainer from "@/components/AContainer";
import { AFilterSelect } from "@/components/form/AFilterSelect";
import PageTitle from "@/components/others/PageTitle";
import { APagination } from "@/components/ui/APagination";
import { Input } from "@/components/ui/input";
import { complainTypeOptions } from "@/data/global.data";
import { useState, useEffect } from "react";
import { useGetComplaintsQuery } from "@/redux/api/complaintApi";
import { useDebounce } from "@/hooks/useDebounce";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
import { AccountCard } from "./AccountCard";
import { ComplainPostCard } from "./ComplainPostCard";
import { formatDistanceToNow } from "date-fns";

type Complaint = {
  id: string;
  type: "ACCOUNT" | "POST";
  status: string;
  reason: string;
  date: string;
  account: {
    id: string;
    role: "PERSON" | "BUSINESS";
    status: "ACTIVE" | "BLOCKED";
    person?: { name: string; email: string; image?: string | null } | null;
    business?: { name: string; email: string; image?: string | null } | null;
  } | null;
  post?: {
    id: string;
    caption: string;
    images: string[];
    views: number;
    createdAt: string;
    author: {
      id: string;
      status: "ACTIVE" | "BLOCKED";
      role: "PERSON" | "BUSINESS";
    };
  } | null;
};

const ComplaintsContainer = () => {
  const [complainType, setComplainType] = useState<"account" | "post">(
    "account"
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 10;

  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 500);

  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetComplaintsQuery({
    page: currentPage,
    limit,
    type: complainType.toUpperCase(),
    searchTerm: debouncedSearchTerm || undefined,
  });

  const complaints: Complaint[] = response?.data?.complaints || [];
  const totalItems = response?.data?.meta?.total || 0;

  useEffect(() => {
    setCurrentPage(1);
  }, [complainType, debouncedSearchTerm]);

  if (isLoading) {
    return (
      <AContainer>
        <div className="min-h-[60vh] flex justify-center items-center">
          <ASpinner size={130} />
        </div>
      </AContainer>
    );
  }

  if (isError) {
    return (
      <AContainer>
        <div className="min-h-[60vh] flex justify-center items-center">
          <AErrorMessage error={error} onRetry={refetch} />
        </div>
      </AContainer>
    );
  }

  return (
    <AContainer>
      <PageTitle
        title="Complaints & Actions"
        subTitle="Review and manage user-reported posts, enforce account restrictions, and maintain a safe, respectful environment for all users"
      />

      <div className="flex items-center gap-4 justify-end mt-6">
        <Input
          name="search"
          placeholder="Search by name, email, or reason..."
          className="w-[300px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <AFilterSelect
          onChange={(value) => setComplainType(value as "account" | "post")}
          placeholder="Type"
          value={complainType}
          options={complainTypeOptions}
          className="!w-[140px]"
        />
      </div>

      <div className="mt-6">
        {complaints.length === 0 ? (
          <div className="text-center py-40">
            <p className="text-lg text-muted-foreground">
              No complaints found.
            </p>
          </div>
        ) : complainType === "account" ? (
          <div className="space-y-3">
            {complaints.map((complaint) => {
              const account = complaint.account!;
              const profile =
                account?.role === "PERSON"
                  ? account.person!
                  : account.business!;
              const name = profile.name;
              const email = profile.email;
              const image = profile.image || "";

              return (
                <AccountCard
                  key={complaint?.id}
                  data={{
                    id: complaint?.id as string,
                    accountId: account?.id,
                    name,
                    email,
                    image,
                    role: account?.role,
                    reason: complaint?.reason,
                    date: formatDistanceToNow(new Date(complaint?.date), {
                      addSuffix: true,
                    }),
                    status: complaint?.status,
                    accountStatus: complaint?.account!.status,
                  }}
                />
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {complaints?.map((complaint) => {
              const post = complaint.post!;
              const imageUrl = post?.images[0] || "/placeholder.svg";
              const views =
                post?.views > 1000
                  ? `${(post?.views / 1000).toFixed(1)}K Views`
                  : `${post?.views} Views`;
              const timeAgo = formatDistanceToNow(new Date(complaint?.date), {
                addSuffix: true,
              });

              return (
                <ComplainPostCard
                  key={complaint?.id}
                  data={{
                    id: complaint?.id,
                    postId: post?.id,
                    author: post?.author,
                    description: post?.caption,
                    views,
                    timeAgo,
                    imageUrl,
                    imageAlt: "Post image",
                    complaintId: complaint?.id,
                    reason: complaint?.reason,
                    status: complaint?.status,
                  }}
                />
              );
            })}
          </div>
        )}
      </div>

      {totalItems > limit && (
        <div className="flex justify-center mt-10">
          <APagination
            totalItems={totalItems}
            itemsPerPage={limit}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </AContainer>
  );
};

export default ComplaintsContainer;
