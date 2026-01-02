import { ReactNode } from "react";
import CountUp from "react-countup";

type StatCardProps = {
  title: string;
  value: number | string;
  icon: ReactNode;
  alt?: string;
};

export default function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-card text-card-foreground p-6 px-8 rounded-xl">
      <div className="flex justify-between gap-3 mb-8">
        <h5 className="font-bold text-xl">{title}</h5>
        {icon}
      </div>
      <span className="text-4xl font-bold tabular-nums text-primary-foreground">
        <CountUp duration={4} end={Number(value)} />
      </span>
    </div>
  );
}
