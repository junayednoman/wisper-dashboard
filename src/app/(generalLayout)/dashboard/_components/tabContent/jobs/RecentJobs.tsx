import ASpinner from "@/components/ui/ASpinner";
import { JobCard } from "./JobCard";
import AErrorMessage from "@/components/AErrorMessage";
import { useGetJobsQuery } from "@/redux/api/jobApi";
import { TJob } from "@/interface/job.interface";

const RecentJobs = () => {
  const { data, isLoading, isError, error, refetch } = useGetJobsQuery({
    page: 1,
    limit: 9,
  });

  const jobs = data?.data?.jobs || [];

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
  if (jobs.length === 0) {
    return (
      <div className="min-h-[500px] flex justify-center items-center">
        <div className="text-center">
          <p className="text-muted-foreground">No Jobs Found</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {jobs.map((job: TJob) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default RecentJobs;
