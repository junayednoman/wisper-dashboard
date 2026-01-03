import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComplaintPosts from "../tabContent/complaints/post/ComplaintPosts";
import Accounts from "../tabContent/complaints/accounts/Accounts";

const ComplaintsTab = () => {
  return (
    <Tabs defaultValue="complaintsPosts" className="complaintTab">
      <TabsList className="w-full bg-transparent">
        <TabsTrigger value="complaintsPosts">Posts</TabsTrigger>
        <TabsTrigger value="Accounts">Accounts</TabsTrigger>
      </TabsList>
      <TabsContent value="complaintsPosts">
        <ComplaintPosts />
      </TabsContent>
      <TabsContent value="Accounts">
        <Accounts />
      </TabsContent>
    </Tabs>
  );
};

export default ComplaintsTab;
