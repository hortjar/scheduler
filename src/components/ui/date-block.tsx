"use client";

import { HTMLAttributes, forwardRef, useState } from "react";
import { Card } from "./card";
import { format } from "date-fns";
import { H2 } from "./typography";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";

export interface DateBlockProps extends HTMLAttributes<HTMLDivElement> {
  date: Date;
  onDateClicked?(date: Date, selected: boolean): void;
  attendees?: string[];
}

const DateBlock = forwardRef<HTMLDivElement, DateBlockProps>(
  ({ onDateClicked, attendees, date, className, ...props }, ref) => {
    const [isSelected, setIsSelected] = useState<boolean>(false);

    function onDateClick() {
      if (!onDateClicked) {
        return;
      }
      onDateClicked(date, !isSelected);
      setIsSelected(!isSelected);
    }

    return (
      <div ref={ref} {...props} className="flex flex-col gap-2">
        <Card
          className={cn(
            "flex flex-col gap-2 rounded-3xl p-5 items-center justify-center w-40 ease-in-out duration-300",
            className,
            onDateClicked ? "hover:ring-2 hover:ring-ring cursor-pointer" : "",
            isSelected ? "ring-2" : ""
          )}
          onClick={onDateClick}
        >
          <span className="text-sm">{format(date, "eeee")}</span>
          <H2 className="pb-0">{date.getDay()}</H2>
          <span className="font-bold">{format(date, "MMMM")}</span>
          <span className="text-sm">{format(date, "p")}</span>
        </Card>
        {attendees && attendees.length > 0 && (
          <Collapsible>
            <CollapsibleTrigger>
              {attendees?.length} attendee{attendees.length == 1 ? "" : "s"}
            </CollapsibleTrigger>
            <CollapsibleContent>
              {attendees.map((x) => (
                <div key={x}>{x}</div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
    );
  }
);
DateBlock.displayName = "DateBlock";

export default DateBlock;
