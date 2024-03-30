import DateBlock from "@/components/ui/date-block";
import { H3, H4 } from "@/components/ui/typography";
import { api } from "@/trpc/server";

export default async function MeetingPage({
  params,
}: {
  params: { meetingKey: string };
}) {
  const meeting = await api.meeting.getByKey.query({
    key: params.meetingKey,
  });

  return (
    <div className="flex flex-col w-full gap-5">
      <H3>Meeting {meeting?.name}</H3>
      <H4>Dates</H4>
      <div className="flex flex-row gap-3 flex-wrap">
        {meeting?.dates.map((x) => (
          <DateBlock key={"date_" + x.id} date={x.date} />
        ))}
      </div>
    </div>
  );
}
