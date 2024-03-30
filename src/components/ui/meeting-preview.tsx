import { RouterOutputs } from "@/trpc/shared";
import { HTMLAttributes, forwardRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import Link from "next/link";
import { format } from "date-fns";

export interface MeetingPreviewProps extends HTMLAttributes<HTMLAnchorElement> {
  meeting: RouterOutputs["meeting"]["getAllPublic"][0];
}

const MeetingPreview = forwardRef<HTMLAnchorElement, MeetingPreviewProps>(
  ({ meeting, ...props }, ref) => {
    function formatMeetingDescription(): string {
      const location = meeting.virtual ? "A virtual" : "An on location";
      const dateFormat = "PPPP";
      let dates = "at an unspecified date";
      if (meeting.dates.length == 1) {
        dates = `on ${format(meeting.dates[0]!.date, dateFormat)}`;
      } else if (meeting.dates.length > 1) {
        dates = `between ${format(meeting.dates[0]!.date, dateFormat)} and ${format(meeting.dates[meeting.dates.length - 1]!.date, dateFormat)}`;
      }
      return `${location} meeting taking place ${dates}`;
    }

    return (
      <Link ref={ref} {...props} href={`/meeting/${meeting.urlKey}`}>
        <Card className="w-full rounded-3xl hover:ring-2 hover:ring-ring ease-in-out duration-300">
          <CardHeader>
            <CardTitle>{meeting.name}</CardTitle>
            <CardDescription>{formatMeetingDescription()}</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </Link>
    );
  }
);
MeetingPreview.displayName = "MeetingPreview";

export default MeetingPreview;
