"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CreateAdPackageModal } from "./CreateAdPackageModal";
import {
  useDeleteBoostPackageMutation,
  useGetBoostPackagesQuery,
} from "@/redux/api/boostPackageApi";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
import { AlertCircle, Loader, Pencil, Trash2 } from "lucide-react";
import { AAlertDialog } from "@/components/others/AAlertDialog";
import handleMutation from "@/utils/handleMutation";
import { EditAdPackageModal } from "./EditAdPackageModal";

type BoostPackage = {
  id: string;
  name: string;
  price: number;
  duration: string;
  status: "ACTIVE" | "INACTIVE" | "ENDED";
};

function StatusBadge({ status }: { status: string }) {
  const isActive = status === "ACTIVE";
  return (
    <Badge
      className={cn(
        "rounded-full px-3 py-1 text-xs font-medium border-0",
        isActive
          ? "bg-green-600/20 text-green-400"
          : "bg-yellow-600/20 text-yellow-400"
      )}
    >
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );
}

export function AdvertisementTable() {
  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetBoostPackagesQuery("");
  const [deletePackage, { isLoading: isDeleting }] =
    useDeleteBoostPackageMutation();

  const packages: BoostPackage[] = response?.data || [];

  // Loading State
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <ASpinner size={120} />
        <p className="mt-6 text-lg text-muted-foreground">
          Loading boost packages...
        </p>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <AErrorMessage error={error} onRetry={refetch} />
      </div>
    );
  }

  const handleDelete = (id: string) => {
    handleMutation(id, deletePackage, "Deleting package...");
  };
  return (
    <div className="space-y-6">
      {/* Header: Create Button */}
      <div className="flex justify-end">
        <CreateAdPackageModal>
          <Button className="h-11 px-6 font-medium rounded-md shadow-sm">
            Create Package
          </Button>
        </CreateAdPackageModal>
      </div>

      {/* Empty State */}
      {packages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-28 text-center border-2 border-dashed border-border rounded-xl bg-muted/20">
          <div className="bg-muted/50 rounded-full p-8 mb-8">
            <AlertCircle className="h-16 w-16 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-semibold text-foreground mb-3">
            No Boost Packages Yet
          </h3>
          <p className="text-muted-foreground max-w-md mb-8">
            Get started by creating your first advertisement boost package.
          </p>
          <CreateAdPackageModal>
            <Button size="lg" className="font-medium">
              Create Your First Package
            </Button>
          </CreateAdPackageModal>
        </div>
      ) : (
        /* Table */
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 border-b border-border bg-muted/30 px-6 py-5 font-medium text-muted-foreground">
            <div className="col-span-4">Package Name</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Duration</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-border">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="grid grid-cols-12 gap-4 px-6 py-6 hover:bg-muted/30 transition-colors"
              >
                {/* Package Name + Duration Description */}
                <div className="col-span-4 flex flex-col justify-center">
                  <span className="text-foreground font-medium text-base">
                    {pkg.name}
                  </span>
                  <span className="text-sm text-muted-foreground mt-1">
                    {pkg.duration === "1"
                      ? "1-day boost"
                      : `${pkg.duration}-day boost`}
                  </span>
                </div>

                {/* Status */}
                <div className="col-span-2 flex items-center justify-center">
                  <StatusBadge status={pkg.status} />
                </div>

                {/* Price */}
                <div className="col-span-2 flex items-center justify-center font-semibold text-foreground">
                  ${pkg.price.toFixed(2)}
                </div>

                {/* Duration */}
                <div className="col-span-2 flex items-center justify-center text-muted-foreground font-medium">
                  {pkg.duration} {Number(pkg.duration) === 1 ? "day" : "days"}
                </div>

                <div className="col-span-2 flex items-center justify-center gap-2">
                  <EditAdPackageModal
                    packageData={{
                      id: pkg.id,
                      name: pkg.name,
                      duration: pkg.duration,
                      price: pkg.price,
                    }}
                  >
                    <Button size="icon" variant="default" className="h-9 w-9">
                      <Pencil className="h-5 w-5" />
                    </Button>
                  </EditAdPackageModal>
                  <AAlertDialog
                    title={"Delete?"}
                    description={`Are you sure you want to delete the package? This action cannot be undone.`}
                    actionText="Delete"
                    onAction={() => handleDelete(pkg.id)}
                  >
                    <Button
                      size="icon"
                      className={`w-[36px] h-[36px] bg-destructive hover:bg-destructive!`}
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <Loader className="animate-spin" />
                      ) : (
                        <Trash2 />
                      )}
                    </Button>
                  </AAlertDialog>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
