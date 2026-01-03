import { useGetComplaintsQuery } from "@/redux/api/complaintApi";
import { ComplaintAccountCard } from "./ComplaintAccountCard";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
import { TComplaint } from "@/interface/post.interface";

const Accounts = () => {
  const { data, isLoading, isError, error, refetch } = useGetComplaintsQuery({
    type: "ACCOUNT",
    page: 1,
    limit: 9,
  });
  const complaints = data?.data?.complaints || [];
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
  if (complaints.length === 0) {
    return (
      <div className="min-h-[500px] flex justify-center items-center">
        <div className="text-center">
          <p className="text-muted-foreground">No Complaints Found</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {complaints?.map((complaint: TComplaint) => (
        <ComplaintAccountCard key={complaint.id} complaint={complaint} />
      ))}
    </div>
  );
};

export default Accounts;
