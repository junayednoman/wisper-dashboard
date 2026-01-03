import type React from "react";
import { TJob } from "@/interface/job.interface";

export function JobCard({ job }: { job: TJob }) {
  return (
    <div className="flex items-center justify-between p-4 bg-card rounded-lg border  transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <div
          className="bg-cover bg-no-repeat bg-center h-13 w-13 rounded-full mr-2"
          style={{
            backgroundImage: `url(${
              job.author.business.image ||
              "https://www.vhv.rs/dpng/d/598-5982089_icon-blue-company-icon-png-transparent-png.png"
            })`,
          }}
        />

        <div className="flex flex-col">
          <h3 className="font-medium text-white">{job.title}</h3>
          <p className="text-sm text-gray-400">{job.author.business.name}</p>
        </div>
      </div>

      <p className="text-white font-medium">N{job.salary} / {job.compensationType === "MONTHLY" ? "MO" : "One-off" }</p>
    </div>
  );
}
