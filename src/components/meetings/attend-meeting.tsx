"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef, useState } from "react";
import DateBlock from "../ui/date-block";
import { InferSelectModel } from "drizzle-orm";
import { meetingDates } from "@/server/db/schema";
import { localStorageHelper } from "@/lib/local-storage-helper";
import { useUser } from "@clerk/nextjs";
import UsernameDialog from "./username-dialog";
import { api } from "@/trpc/react";

export interface MeetingsPerAttendee {
  userId: string;
  userName: string;
  dbId: string;
  dateIds: string[];
}

export interface AttendMeetingProps extends HTMLAttributes<HTMLDivElement> {
  meetingId: string;
  attendances: MeetingsPerAttendee[];
  dates: InferSelectModel<typeof meetingDates>[];
}

const AttendMeeting = forwardRef<HTMLDivElement, AttendMeetingProps>(
  ({ meetingId, dates, className, ...props }, ref) => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [attendances, setAttendance] = useState<MeetingsPerAttendee[]>(
      props.attendances
    );
    const user = useUser();

    const addDbAttendance = api.meeting.addAttendance.useMutation();
    const removeDbAttendance = api.meeting.removeAttendance.useMutation();

    async function onDateClicked(date: Date, selected: boolean, id: string) {
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
      let addAttendance = true;
      if (attendance) {
        if (attendance.dateIds.includes(id)) {
          attendance.dateIds = attendance.dateIds.filter((x) => x != id);
          addAttendance = false;
        } else {
          attendance.dateIds.push(id);
        }

        if (attendance.dateIds.length == 0) {
          newAttendees = attendances.filter((x) => x.userId != userId);
        }
        newAttendees = attendances;
      } else {
        attendance = {
          userId,
          userName,
          dateIds: [id],
          dbId: "",
        };
        newAttendees = [...attendances, attendance];
      }

      if (addAttendance) {
        attendance.dbId =
          (
            await addDbAttendance.mutateAsync({
              meetingId,
              userId,
              userName,
              meetingDateId: id,
            })
          )?.id ?? "";
      } else {
        await removeDbAttendance.mutateAsync({
          id: attendance.dbId,
          userId,
        });
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

    if (!user.isLoaded) {
      return <></>;
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
          onUsernameSubmit={onDialogSubmit}
          onOpenChange={dialogOpenChange}
        />
      </div>
    );
  }
);
AttendMeeting.displayName = "AttendMeeting";

export default AttendMeeting;
