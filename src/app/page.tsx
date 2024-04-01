import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PublicMeetings from "@/components/meetings/public-meetings";
import PrivateMeetings from "@/components/meetings/private-meetings";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const user = auth();

  return (
    <Tabs defaultValue="public" className="w-full">
      <TabsList className="rounded-3xl">
        <TabsTrigger value="public" className="rounded-2xl rounded-r-none">
          Public meetings
        </TabsTrigger>
        <TabsTrigger
          value="personal"
          className="rounded-2xl rounded-l-none"
          disabled={user.userId == null}
        >
          Private meetings
        </TabsTrigger>
      </TabsList>
      <div className="mt-5">
        <TabsContent value="public">
          <PublicMeetings />
        </TabsContent>
        <TabsContent value="personal">
          {user.userId && <PrivateMeetings />}
        </TabsContent>
      </div>
    </Tabs>
  );
}
