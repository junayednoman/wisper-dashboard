import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecentJobs from "../tabContent/jobs/RecentJobs";
import Posts from "../tabContent/post/Posts";
import ComplaintsTab from "./ComplaintsTab";

const DashboardTabs = () => {
  return (
    <Tabs defaultValue="complaints">
      <TabsList className="w-full h-12 p-1 mb-2">
        <TabsTrigger value="complaints">Complaints</TabsTrigger>
        <TabsTrigger value="recentJobs">Recent Jobs</TabsTrigger>
        <TabsTrigger value="posts">Posts</TabsTrigger>
      </TabsList>
      <TabsContent value="complaints">
        <ComplaintsTab />
      </TabsContent>
      <TabsContent value="recentJobs">
        <RecentJobs />
      </TabsContent>
      <TabsContent value="posts">
        <Posts />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
