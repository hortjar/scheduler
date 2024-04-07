"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef, useState } from "react";
import DateBlock from "../ui/date-block";
import { InferSelectModel } from "drizzle-orm";
import { meetingDates } from "@/server/db/schema";
import { localStorageHelper } from "@/lib/local-storage-helper";
import { useUser } from "@clerk/nextjs";
import UsernameDialog from "./username-dialog";

interface AttendeesPerID {
  id: string;
  attendees: string[];
}

export interface AttendMeetingProps extends HTMLAttributes<HTMLDivElement> {
  dates: InferSelectModel<typeof meetingDates>[];
}

const AttendMeeting = forwardRef<HTMLDivElement, AttendMeetingProps>(
  ({ dates, className, ...props }, ref) => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [attendees, setAttendees] = useState<AttendeesPerID[]>([]);
    const user = useUser();

    function onDateClicked(date: Date, selected: boolean, id: string) {
      if (!localStorageHelper.hasKey("username") && !user.isSignedIn) {
        setIsDialogOpen(true);
        return;
      }

      const username =
        user.user?.fullName ?? localStorageHelper.getItem("username")!;

      setAttendees((originalAttendees) => {
        const idAttendees = originalAttendees.find((x) => x.id == id) ?? {
          id: id,
          attendees: [],
        };

        if (selected) {
          if (!idAttendees.attendees.includes(username)) {
            idAttendees.attendees.push(username);
          }
        } else {
          idAttendees.attendees = idAttendees.attendees.filter(
            (x) => x != username
          );
        }
        console.log(idAttendees);
        return [...originalAttendees.filter((x) => x.id != id), idAttendees];
      });
    }

    function onDialogSubmit(name: string) {
      localStorageHelper.setItem("username", name);
      setIsDialogOpen(false);
    }

    function dialogOpenChange(open: boolean) {
      setIsDialogOpen(open);
    }

    return (
      <div
        ref={ref}
        {...props}
        className={cn(className, "flex flex-row gap-3 flex-wrap")}
      >
        {dates.map((x) => (
          <DateBlock
            key={"date_" + x.id}
            date={x.date}
            onDateClicked={(date, selected) =>
              onDateClicked(date, selected, x.id)
            }
            attendees={attendees.find((y) => y.id == x.id)?.attendees}
          />
        ))}
        <UsernameDialog
          open={isDialogOpen}
          onSubmit={onDialogSubmit}
          onOpenChange={dialogOpenChange}
        />
      </div>
    );
  }
);
AttendMeeting.displayName = "AttendMeeting";

export default AttendMeeting;
