"use client";

import { HTMLAttributes, forwardRef } from "react";
import { Coordinates } from "@/server/db/schema";
import Map from "@/components/map/map";

export interface MeetingLocationProps extends HTMLAttributes<HTMLDivElement> {
  defaultLocation?: Coordinates;
}

const MeetingLocation = forwardRef<HTMLDivElement, MeetingLocationProps>(
  ({ defaultLocation, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className="h-[400px]">
        <Map defaultLocation={defaultLocation} />
      </div>
    );
  }
);
MeetingLocation.displayName = "MeetingLocation";

export default MeetingLocation;
