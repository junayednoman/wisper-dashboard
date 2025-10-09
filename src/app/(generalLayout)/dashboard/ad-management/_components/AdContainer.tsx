import AContainer from "@/components/AContainer";
import PageTitle from "@/components/others/PageTitle";
import AdStatCard from "./AdStatCard";
import { AdvertisementTable } from "./AdTable";

const AdContainer = () => {
  return (
    <AContainer>
      <PageTitle
        title="Advertisements Management"
        subTitle="Manage and monitor all advertisements across the platform. Track performance, update ads, and ensure a seamless ad experience for users"
      />
      <div className="grid grid-cols-7 gap-5 mt-7">
        <AdStatCard />
        <AdStatCard />
        <AdStatCard />
        <AdStatCard />
        <AdStatCard />
      </div>
      <div className="mt-7">
        <AdvertisementTable />
      </div>
    </AContainer>
  );
};

export default AdContainer;
