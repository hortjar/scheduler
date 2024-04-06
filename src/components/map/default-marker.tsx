"use client";

import { LatLngExpression } from "leaflet";
import { type FC } from "react";
import { Marker, Popup } from "react-leaflet";

interface DefaultMarkerProps {
  location: LatLngExpression;
}

export const DefaultMarker: FC<DefaultMarkerProps> = (props) => {
  return (
    <Marker position={props.location}>
      <Popup>Location of this meeting</Popup>
    </Marker>
  );
};
