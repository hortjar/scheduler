import MeetingPreview from "@/components/ui/meeting-preview";
import { H3 } from "@/components/ui/typography";
import { api } from "@/trpc/server";

export default async function Home() {
  const meetings = await api.meeting.getAllPublic.query();

  return (
    <div className="flex flex-col gap-6 w-full">
      <H3>Public meetings</H3>
      {meetings.map((x) => (
        <MeetingPreview key={"meeting_" + x.urlKey} meeting={x} />
      ))}
    </div>
  );
}
