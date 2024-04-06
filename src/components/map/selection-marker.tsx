"use client";

import { LatLng } from "leaflet";
import { useState, type FC } from "react";
import { Marker, Popup, useMapEvent } from "react-leaflet";

interface SelectionMarkerProps {
  locationSelected: (latLong: LatLng) => void;
}

export const SelectionMarker: FC<SelectionMarkerProps> = (props) => {
  const [selectedLocation, setSelectedLocation] = useState<LatLng>();

  useMapEvent("click", (e) => {
    console.log(e);
    setSelectedLocation(e.latlng);
    props.locationSelected(e.latlng);
  });

  return (
    selectedLocation && (
      <Marker position={selectedLocation}>
        <Popup>Your desired location</Popup>
      </Marker>
    )
  );
};
