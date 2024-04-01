import { LatLng } from "leaflet";
import { HTMLAttributes, forwardRef } from "react";
import dynamic from "next/dynamic";

export interface MeetingLocationProps extends HTMLAttributes<HTMLDivElement> {
  defaultLocation?: LatLng;
}

const DynamicMap = dynamic(() => import("@/components/map/map"), {
  ssr: false,
});

const MeetingLocation = forwardRef<HTMLDivElement, MeetingLocationProps>(
  ({ defaultLocation, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {window && <DynamicMap defaultLocation={defaultLocation} />}
      </div>
    );
  }
);
MeetingLocation.displayName = "MeetingLocation";

export default MeetingLocation;
