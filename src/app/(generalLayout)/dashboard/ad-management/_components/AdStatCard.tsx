type Props = {
  data: {
    title: string;
    value: number;
    icon: React.ReactNode;
  };
};

const AdStatCard = ({ data }: Props) => {
  return (
    <div className="bg-card p-3 rounded-xl px-5">
      <h4 className="text-xl font-semibold text-card-foreground">
        {data.title}
      </h4>
      <div className="flex items-center gap-2 text-muted-foreground mt-4">
        {data.icon}
        <p>{data.value}</p>
      </div>
    </div>
  );
};

export default AdStatCard;
