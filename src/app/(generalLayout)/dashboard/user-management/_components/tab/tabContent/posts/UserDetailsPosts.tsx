import { APagination } from "@/components/ui/APagination";
import { UserDetailsPostCard } from "./UserDetailsPostCard";
import AErrorMessage from "@/components/AErrorMessage";
import ASpinner from "@/components/ui/ASpinner";
import { useState } from "react";
import { TPost } from "@/interface/post.interface";
import { useGetPostsQuery } from "@/redux/api/postApi";
import { usePathname } from "next/navigation";

const UserDetailsPosts = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 6;
  const path = usePathname();
  const id = path?.split("user-management/")[1];

  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetPostsQuery(
    {
      authorId: id,
      page: currentPage,
      limit,
    },
    {
      skip: !id,
    }
  );

  const posts: TPost[] = response?.data?.posts || [];

  const totalItems = response?.data?.meta?.total || 0;
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
    <div className="space-y-8">
      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <UserDetailsPostCard key={post.id} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
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
        <div className="min-h-[500px] flex flex-col items-center justify-center text-center">
          <p className="text-lg text-muted-foreground">No posts found</p>
          <p className="text-sm text-muted-foreground mt-2">
            This user hasn&apos;t shared any posts yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPosts;
