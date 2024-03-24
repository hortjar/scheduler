export default async function MeetingPage({
  params,
}: {
  params: { meetingKey: string };
}) {
  return <div>Meeting {params.meetingKey}</div>;
}
