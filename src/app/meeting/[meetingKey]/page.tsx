import AttendMeeting, {
  MeetingsPerAttendee,
} from "@/components/meetings/attend-meeting";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { H4 } from "@/components/ui/typography";
import { api } from "@/trpc/server";
import { auth } from "@clerk/nextjs/server";
import { Pencil } from "lucide-react";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

export default async function MeetingPage({
  params,
}: {
  params: { meetingKey: string };
}) {
  const user = auth();
  const meeting = await api.meeting.getByKey.query({
    key: params.meetingKey,
  });

  if (!meeting) {
    redirect("/");
  }

  const MeetingLocationWithNoSSR = dynamic(
    () => import("@/components/meetings/meeting-location"),
    {
      ssr: false,
    }
  );

  const attendances: MeetingsPerAttendee[] = [];
  for (const meetingDate of meeting.dates) {
    if (meetingDate.attendances.length == 0) {
      continue;
    }

    for (const meetingDateAttendance of meetingDate.attendances) {
      const userAttendance = attendances.find(
        (x) => x.dbId == meetingDateAttendance.id
      );

      if (userAttendance) {
        userAttendance.dateIds.push(meetingDateAttendance.meetingDateId);
      } else {
        attendances.push({
          userId: meetingDateAttendance.userId,
          userName: meetingDateAttendance.userName,
          dateIds: [meetingDateAttendance.meetingDateId],
          dbId: meetingDateAttendance.id,
        });
      }
    }
  }
  console.log(attendances);

  return (
    <Card className="w-full rounded-3xl">
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <CardTitle>Meeting {meeting.name}</CardTitle>
          {user.userId && meeting.creator_id == user.userId && (
            <div>
              <Button variant={"secondary"} disabled>
                <Pencil className="w-5 h-5 mr-2" />
                Edit
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {meeting.coordinates && (
          <>
            <H4>Location</H4>
            <MeetingLocationWithNoSSR defaultLocation={meeting.coordinates} />
          </>
        )}
        <H4>Attendance</H4>
        <AttendMeeting
          attendances={attendances}
          meetingId={meeting.id}
          dates={meeting.dates}
        />
      </CardContent>
    </Card>
  );
}
