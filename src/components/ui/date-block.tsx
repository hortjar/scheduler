"use client";

import { HTMLAttributes, forwardRef, useState } from "react";
import { Card } from "./card";
import { format } from "date-fns";
import { H2 } from "./typography";
import { cn } from "@/lib/utils";
import { MeetingsPerAttendee } from "../meetings/attend-meeting";
import { InferSelectModel } from "drizzle-orm";
import { meetingDates } from "@/server/db/schema";

export interface DateBlockProps extends HTMLAttributes<HTMLDivElement> {
  date: InferSelectModel<typeof meetingDates>;
  onDateClicked?(date: Date, selected: boolean): void;
  attendance?: MeetingsPerAttendee[];
}

const DateBlock = forwardRef<HTMLDivElement, DateBlockProps>(
  ({ onDateClicked, attendance, date, className, ...props }, ref) => {
    const [isSelected, setIsSelected] = useState<boolean>(false);

    function onDateClick() {
      if (!onDateClicked) {
        return;
      }
      onDateClicked(date.date, !isSelected);
      setIsSelected(!isSelected);
    }

    return (
      <div ref={ref} {...props} className="flex flex-col">
        <Card
          className={cn(
            "flex flex-col gap-2 rounded-3xl p-5 items-center justify-center w-40 ease-in-out duration-300",
            className,
            onDateClicked ? "hover:ring-2 hover:ring-ring cursor-pointer" : "",
            isSelected ? "ring-2" : "",
            attendance && attendance.length > 0 ? "mb-2" : ""
          )}
          onClick={onDateClick}
        >
          <span className="text-sm">{format(date.date, "eeee")}</span>
          <H2 className="pb-0">{date.date.getDate()}</H2>
          <span className="font-bold">{format(date.date, "MMMM")}</span>
          <span className="text-sm">{format(date.date, "p")}</span>
        </Card>
        {attendance &&
          attendance.map((x) => (
            <div
              key={`${date.id}_${x.userId}`}
              className={cn(
                x.dateIds.includes(date.id) ? "bg-primary" : "bg-secondary",
                "w-40 h-10 rounded-lg"
              )}
            ></div>
          ))}
      </div>
    );
  }
);
DateBlock.displayName = "DateBlock";

export default DateBlock;
