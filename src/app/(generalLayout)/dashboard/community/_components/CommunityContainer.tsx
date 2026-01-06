"use client";
import { useState } from "react";
import { AFilterSelect } from "@/components/form/AFilterSelect";
import { communityTypeOptions } from "@/data/global.data";
import { Input } from "@/components/ui/input";
import { APagination } from "@/components/ui/APagination";
import PageTitle from "@/components/others/PageTitle";
import AContainer from "@/components/AContainer";
import { CommunityCard } from "./CommunityCard";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useGetClassesQuery,
  useGetGroupsQuery,
} from "@/redux/api/communityApi";
import { TCommunity } from "@/interface/community.interface";

const CommunityContainer = () => {
  const [communityType, setCommunityType] = useState<string>("group");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 10;
  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 500);

  const { data, isLoading, isError, error, refetch } = useGetGroupsQuery(
    {
      page: currentPage,
      limit,
      searchTerm: debouncedSearchTerm || undefined,
    },
    { skip: communityType === "class" }
  );

  const {
    data: classesData,
    isLoading: classesIsLoading,
    isError: classesIsError,
    error: classesError,
    refetch: classesRefetch,
  } = useGetClassesQuery(
    {
      page: currentPage,
      limit,
      searchTerm: debouncedSearchTerm || undefined,
    },
    { skip: communityType === "group" }
  );

  const communityData =
    communityType === "group" ? data?.data : classesData?.data;

  const communities = communityData?.groups || communityData?.classes || [];

  const totalItems = communityData?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / limit);

  if (isLoading || classesIsLoading) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <ASpinner size={140} />
      </div>
    );
  }

  if (isError || classesIsError) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <AErrorMessage
          error={error ? error : classesError}
          onRetry={error ? refetch : classesRefetch}
        />
      </div>
    );
  }
  return (
    <div>
      <AContainer>
        <PageTitle
          title="Community Engagement"
          subTitle="Manage user groups, track class activities, and nurture a collaborative engaging environment"
        />
        <div className="flex items-center gap-4 justify-end">
          <Input
            onChange={(e) => setSearchTerm(e.target.value)}
            name="search"
            placeholder="Search..."
            className="w-[250px]"
          />
          <AFilterSelect
            onChange={setCommunityType}
            placeholder={"user type"}
            value={communityType}
            options={communityTypeOptions}
            className="!w-[100px]"
          />
        </div>
        {communities.length > 0 ? (
          <>
            <div className="space-y-3 mt-10">
              {communities?.map((community: TCommunity) => (
                <CommunityCard
                  communityType={communityType}
                  key={community.id}
                  community={community}
                />
              ))}
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
          </>
        ) : (
          <div className="min-h-[500px] flex justify-center items-center">
            <p className="text-muted-foreground text-lg">
              No Communities Found!
            </p>
          </div>
        )}
      </AContainer>
    </div>
  );
};

export default CommunityContainer;
