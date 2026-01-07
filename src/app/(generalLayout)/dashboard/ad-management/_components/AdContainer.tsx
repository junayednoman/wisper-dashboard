import AContainer from "@/components/AContainer";
import PageTitle from "@/components/others/PageTitle";
import { AdvertisementTable } from "./AdTable";

const AdContainer = () => {
  return (
    <AContainer>
      <PageTitle
        title="Advertisements Management"
        subTitle="Manage and monitor all advertisements across the platform. Track performance, update ads, and ensure a seamless ad experience for users"
      />
      {/* <div className="grid grid-cols-7 gap-5 mt-7">
        <AdStatCard
          data={{
            title: "Total Ads",
            value: 23,
            icon: <Megaphone size={18} />,
          }}
        />
        <AdStatCard
          data={{
            title: "Total Ad Revenue",
            value: 237,
            icon: <DollarSign size={18} />,
          }}
        />
      </div> */}
      <div className="mt-7">
        <AdvertisementTable />
      </div>
    </AContainer>
  );
};

export default AdContainer;
