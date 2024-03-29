import { RouterOutputs } from "@/trpc/shared";
import { HTMLAttributes, forwardRef } from "react";
import { Card } from "./card";
import Link from "next/link";
import { H4 } from "./typography";

export interface MeetingPreviewProps extends HTMLAttributes<HTMLAnchorElement> {
  meeting: RouterOutputs["meeting"]["getAllPublic"][0];
}

const MeetingPreview = forwardRef<HTMLAnchorElement, MeetingPreviewProps>(
  ({ meeting, ...props }, ref) => {
    return (
      <Link ref={ref} {...props} href={`/meeting/${meeting.urlKey}`}>
        <Card className="w-full px-10 py-8 rounded-3xl hover:ring-2 hover:ring-ring ease-in-out duration-300">
          <H4>{meeting.name}</H4>
        </Card>
      </Link>
    );
  }
);
MeetingPreview.displayName = "MeetingPreview";

export default MeetingPreview;
