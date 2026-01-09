"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { APagination } from "@/components/ui/APagination";
import AContainer from "@/components/AContainer";
import PageTitle from "@/components/others/PageTitle";
import { MemberCard } from "../_components/MemberCard";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetCommunityMembersQuery } from "@/redux/api/communityApi";
import { TMember } from "@/interface/community.interface";
import { PageProps } from "../../../../../../.next/types/app/layout";

const CommunityDetailsContainer = ({ params }: { params: PageProps }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const limit = 10;
  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 500);
  const communityId = (params as any).id;

  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCommunityMembersQuery({
    id: communityId,
    params: {
      page: currentPage,
      limit,
      searchTerm: debouncedSearchTerm || undefined,
    },
  });

  const community = response?.data?.community;
  const members: TMember[] = response?.data?.members || [];
  const totalItems = response?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / limit);

  // Reset to page 1 when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  if (isLoading) {
    return (
      <AContainer>
        <div className="min-h-[60vh] flex justify-center items-center">
          <ASpinner size={140} />
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
      {/* Community Header */}
      <div className="flex items-center gap-4">
        <div
          className="size-25 bg-cover bg-center bg-no-repeat rounded-full mr-1"
          style={{
            backgroundImage: `url(${
              community?.image || "https://i.postimg.cc/zGr81PKy/group-icon.png"
            })`,
          }}
        ></div>
        <PageTitle
          title={community?.name || "Community"}
          subTitle={`${community?.chat?._count?.participants || 0} members`}
        />
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4 justify-end mt-6">
        <Input
          name="search"
          placeholder="Search by name, email..."
          className="w-[300px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Members List */}
      <div className="space-y-3 mt-6">
        {members.length > 0 ? (
          members.map((member) => {
            return <MemberCard key={member.id} member={member} />;
          })
        ) : (
          <div className="min-h-[400px] flex justify-center items-center">
            <p className="text-muted-foreground text-lg">No members found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <APagination
            totalItems={totalItems}
            itemsPerPage={limit}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </AContainer>
  );
};

export default CommunityDetailsContainer;
