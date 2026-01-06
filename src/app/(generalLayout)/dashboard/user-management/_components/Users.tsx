"use client";

import { useState } from "react";
import { AFilterSelect } from "@/components/form/AFilterSelect";
import { userTypeOptions } from "@/data/global.data";
import { Input } from "@/components/ui/input";
import { APagination } from "@/components/ui/APagination";
import ASpinner from "@/components/ui/ASpinner";
import { useGetUsersQuery } from "@/redux/api/userApi";
import AErrorMessage from "@/components/AErrorMessage";
import { TUser } from "@/interface/user.interface";
import { AccountCard } from "./AccountCard";
import { useDebounce } from "@/hooks/useDebounce";

const Users = () => {
  const [userType, setUserType] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 10;
  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 500);
  const { data, isLoading, isError, error, refetch } = useGetUsersQuery({
    page: currentPage,
    limit,
    searchTerm: debouncedSearchTerm || undefined,
    role: userType === "ALL" ? "" : userType,
  });

  const users: TUser[] = data?.data?.auths || [];
  const totalItems = data?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / limit);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <ASpinner size={140} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <AErrorMessage error={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters & Search */}
      <div className="flex items-center gap-4 justify-end">
        <Input
          name="search"
          placeholder="Search by name or email..."
          className="w-[300px]"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <AFilterSelect
          onChange={(value) => {
            setUserType(value);
            setCurrentPage(1);
          }}
          placeholder="User type"
          value={userType}
          options={userTypeOptions}
          className="!w-[140px]"
        />
      </div>

      {users.length > 0 ? (
        <>
          {/* User Cards */}
          <div className="space-y-3">
            {users.map((user: TUser) => (
              <AccountCard key={user.id} user={user} />
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
          <p className="text-muted-foreground text-lg">No Users Found</p>
        </div>
      )}
    </div>
  );
};

export default Users;
