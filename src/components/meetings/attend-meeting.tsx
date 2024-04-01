"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef, useRef, useState } from "react";
import DateBlock from "../ui/date-block";
import { InferSelectModel } from "drizzle-orm";
import { meetingDates } from "@/server/db/schema";
import { localStorageHelper } from "@/lib/local-storage-helper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";

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
    const usernameRef = useRef<HTMLInputElement | null>(null);
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

    function dialogOpenChange(open: boolean) {
      setIsDialogOpen(open);
    }

    function onDialogSubmit() {
      if (usernameRef.current) {
        localStorageHelper.setItem("username", usernameRef.current?.value);
      }
      setIsDialogOpen(false);
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
        <Dialog open={isDialogOpen} onOpenChange={dialogOpenChange}>
          <DialogContent className="rounded-3xl">
            <DialogHeader>
              <DialogTitle>Hello!</DialogTitle>
              <DialogDescription>
                <p>
                  It looks like this is your first time attending a meeting on
                  this site. Please, pick a name so others know who is
                  attending.
                </p>
                <p>
                  If you do not want to set a username, you can sign in on the
                  top right of your screen.
                </p>
              </DialogDescription>
            </DialogHeader>
            <div>
              {" "}
              <div className="flex flex-row gap-3 items-center justify-center">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" ref={usernameRef} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={onDialogSubmit}>
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
);
AttendMeeting.displayName = "AttendMeeting";

export default AttendMeeting;
