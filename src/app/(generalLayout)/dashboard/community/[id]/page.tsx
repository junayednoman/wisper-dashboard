import CommunityDetailsContainer from "../_components/CommunityDetailsContainer";

const CommunityDetailsPage = async ({ params }: { params: any }) => {
  return <CommunityDetailsContainer params={await params} />;
};

export default CommunityDetailsPage;
