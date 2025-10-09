import { Megaphone } from "lucide-react";

const AdStatCard = () => {
  return (
    <div className="bg-card p-3 rounded-xl px-5">
      <h4 className="text-xl font-semibold text-card-foreground">Total Ads</h4>
      <div className="flex items-center gap-2 text-muted-foreground mt-4">
        <Megaphone size={18} />
        <p>230</p>
      </div>
    </div>
  );
};

export default AdStatCard;
