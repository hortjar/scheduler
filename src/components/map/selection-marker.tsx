import { LatLngExpression } from "leaflet";
import { useState, type FC } from "react";
import { Marker, Popup, useMapEvent } from "react-leaflet";

export const SelectionMarker: FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<LatLngExpression>();

  useMapEvent("click", (e) => {
    console.log(e);
    setSelectedLocation(e.latlng);
  });

  return (
    selectedLocation && (
      <Marker position={selectedLocation}>
        <Popup>Your desired location</Popup>
      </Marker>
    )
  );
};
