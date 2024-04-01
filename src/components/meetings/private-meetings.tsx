import { api } from "@/trpc/server";
import MeetingPreview from "./meeting-preview";
import { auth } from "@clerk/nextjs/server";

export default async function PrivateMeetings() {
  auth().protect();

  const meetings = await api.meeting.getAllForUser.query();

  return (
    <div className="flex flex-col gap-6 w-full">
      {meetings.map((x) => (
        <MeetingPreview key={"meeting_" + x.urlKey} meeting={x} />
      ))}
    </div>
  );
}
