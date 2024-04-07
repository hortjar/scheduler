"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef, useState } from "react";
import DateBlock from "../ui/date-block";
import { InferSelectModel } from "drizzle-orm";
import { meetingDates } from "@/server/db/schema";
import { localStorageHelper } from "@/lib/local-storage-helper";
import { useUser } from "@clerk/nextjs";
import UsernameDialog from "./username-dialog";

export interface MeetingsPerAttendee {
  userId: string;
  userName: string;
  meetingIds: string[];
}

export interface AttendMeetingProps extends HTMLAttributes<HTMLDivElement> {
  dates: InferSelectModel<typeof meetingDates>[];
}

const AttendMeeting = forwardRef<HTMLDivElement, AttendMeetingProps>(
  ({ dates, className, ...props }, ref) => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [attendances, setAttendance] = useState<MeetingsPerAttendee[]>([]);
    const user = useUser();

    function onDateClicked(date: Date, selected: boolean, id: string) {
      if (
        !localStorageHelper.hasKey("username") &&
        !localStorageHelper.hasKey("user_id") &&
        !user.isSignedIn
      ) {
        setIsDialogOpen(true);
        return;
      }

      const userName =
        user.user?.fullName ?? localStorageHelper.getItem("username")!;
      const userId = user.user?.id ?? localStorageHelper.getItem("user_id")!;

      let attendance = attendances.find((x) => x.userId == userId);
      let newAttendees = [];
      if (attendance) {
        if (attendance.meetingIds.includes(id)) {
          attendance.meetingIds = attendance.meetingIds.filter((x) => x != id);
        } else {
          attendance.meetingIds.push(id);
        }

        if (attendance.meetingIds.length == 0) {
          return attendances.filter((x) => x.userId != userId);
        }
        newAttendees = attendances;
      } else {
        attendance = {
          userId,
          userName,
          meetingIds: [id],
        };
        newAttendees = [...attendances, attendance];
      }
      setAttendance(newAttendees);
    }

    function onDialogSubmit(name: string) {
      localStorageHelper.setItem("username", name);
      localStorageHelper.setItem("user_id", `local_${crypto.randomUUID()}`);
      setIsDialogOpen(false);
    }

    function dialogOpenChange(open: boolean) {
      setIsDialogOpen(open);
    }

    return (
      <div
        ref={ref}
        {...props}
        className={cn(className, "flex flex-row gap-10")}
      >
        <div className="flex flex-col gap-2 pt-44 min-w-28">
          {attendances.map((x) => (
            <div key={x.userId} className="flex items-center h-10">
              {x.userName}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 overflow-auto p-2 pb-6 lg:pb-2">
          <div className="flex flex-row gap-3 row-start-1 col-start-1">
            {dates.map((x) => (
              <DateBlock
                key={"date_" + x.id}
                date={x}
                onDateClicked={(date, selected) => {
                  console.log("date clicked", new Date());
                  onDateClicked(date, selected, x.id);
                }}
                attendance={attendances}
              />
            ))}
          </div>
        </div>
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
