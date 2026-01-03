import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
import { useGetPostsQuery } from "@/redux/api/postApi";
import { TPost } from "@/interface/post.interface";
import PostCard from "./PostCard";

const Posts = () => {
  const { data, isLoading, isError, error, refetch } = useGetPostsQuery({
    page: 1,
    limit: 4,
  });

  const posts = data?.data?.posts || [];

  if (isLoading)
    return (
      <div className="min-h-[500px] flex justify-center items-center">
        <ASpinner className="flex justify-center items-center" />
      </div>
    );
  if (isError)
    return (
      <div className="min-h-[500px] flex justify-center items-center">
        <AErrorMessage error={error} onRetry={refetch} />
      </div>
    );
  if (posts.length === 0) {
    return (
      <div className="min-h-[500px] flex justify-center items-center">
        <div className="text-center">
          <p className="text-muted-foreground">No Posts Found</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {posts?.map((post: TPost) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
