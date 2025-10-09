"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CreateAdPackageModal } from "./CreateAdPackageModal";

interface Advertisement {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Ended";
  budget: number;
  package: string;
  impressions: string;
  clicks: string;
  impressionsVariant: "success" | "warning" | "danger" | "default";
  clicksVariant: "success" | "warning" | "danger" | "default";
}

const advertisements: Advertisement[] = [
  {
    id: "1",
    name: "Grow Your Business...",
    description: "Reach your ideal audience..",
    status: "Active",
    budget: 50.0,
    package: "Basic",
    impressions: "10k+ Views",
    clicks: "200+ Clicks",
    impressionsVariant: "success",
    clicksVariant: "success",
  },
  {
    id: "2",
    name: "Grow Your Business...",
    description: "Reach your ideal audience..",
    status: "Ended",
    budget: 50.0,
    package: "Basic",
    impressions: "0k+ Views",
    clicks: "0k+ Clicks",
    impressionsVariant: "default",
    clicksVariant: "default",
  },
  {
    id: "3",
    name: "Grow Your Business...",
    description: "Reach your ideal audience..",
    status: "Active",
    budget: 50.0,
    package: "Basic",
    impressions: "2k+ Views",
    clicks: "200+ Clicks",
    impressionsVariant: "danger",
    clicksVariant: "danger",
  },
  {
    id: "4",
    name: "Grow Your Business...",
    description: "Reach your ideal audience..",
    status: "Active",
    budget: 50.0,
    package: "Basic",
    impressions: "2k+ Views",
    clicks: "200+ Clicks",
    impressionsVariant: "danger",
    clicksVariant: "danger",
  },
];

function StatusBadge({ status }: { status: "Active" | "Ended" }) {
  return (
    <Badge
      className={cn(
        "rounded-md px-4 py-1.5 text-xs font-medium border-0",
        status === "Active" && "bg-green-600/20 text-green-400",
        status === "Ended" && "bg-yellow-600/20 text-yellow-400"
      )}
    >
      {status}
    </Badge>
  );
}

function MetricBadge({
  value,
  variant,
}: {
  value: string;
  variant: "success" | "warning" | "danger" | "default";
}) {
  return (
    <Badge
      className={cn(
        "rounded-md px-3 py-1.5 text-xs font-medium border-0",
        variant === "success" && "bg-green-600/20 text-green-400",
        variant === "warning" && "bg-yellow-600/20 text-yellow-400",
        variant === "danger" && "bg-red-600/20 text-red-400",
        variant === "default" && "bg-muted/50 text-muted-foreground"
      )}
    >
      {value}
    </Badge>
  );
}

export function AdvertisementTable() {
  return (
    <div>
      <div className="mb-4 flex justify-end gap-3">
        <Input
          name="search"
          placeholder="Search..."
          className="w-[250px] h-11"
        />
        <CreateAdPackageModal>
          <Button className="rounded-md h-11">Create Package</Button>
        </CreateAdPackageModal>
      </div>
      <div className="w-full border border-border rounded-lg bg-card">
        <div className="grid grid-cols-6 border-b border-border font-medium text-muted-foreground py-5 px-3">
          <div className="px-4">Advertisement name</div>
          <div className="px-4">Status</div>
          <div className="px-4">Budget</div>
          <div className="px-4">Package</div>
          <div className="px-4">Impressions</div>
          <div className="px-4">Clicks</div>
        </div>

        {advertisements.map((ad) => (
          <div
            key={ad.id}
            className="grid grid-cols-6 border-b border-border last:border-b-0 py-5 px-3"
          >
            <div className="px-4 flex flex-col">
              <span className="text-foreground font-medium">{ad.name}</span>
              <span className="text-muted-foreground text-xs">
                {ad.description}
              </span>
            </div>
            <div className="px-4">
              <StatusBadge status={ad.status} />
            </div>
            <div className="px-4">${ad.budget.toFixed(2)}</div>
            <div className="px-4 text-muted-foreground">{ad.package}</div>
            <div className="px-4">
              <MetricBadge
                value={ad.impressions}
                variant={ad.impressionsVariant}
              />
            </div>
            <div className="px-4">
              <MetricBadge value={ad.clicks} variant={ad.clicksVariant} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
