import AttendMeeting from "@/components/ui/attend-meeting";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { H4 } from "@/components/ui/typography";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function MeetingPage({
  params,
}: {
  params: { meetingKey: string };
}) {
  const meeting = await api.meeting.getByKey.query({
    key: params.meetingKey,
  });

  if (!meeting) {
    redirect("/");
  }

  return (
    <Card className="w-full rounded-3xl">
      <CardHeader>
        <CardTitle>Meeting {meeting.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {meeting.coordinates && (
          <>
            <H4>Location</H4>
            {/* <MeetingLocation
              defaultLocation={
                new LatLng(
                  meeting.coordinates.latitude,
                  meeting.coordinates.longitude
                )
              }
            /> */}
          </>
        )}
        <H4>Dates</H4>
        <AttendMeeting dates={meeting.dates} />
      </CardContent>
    </Card>
  );
}
