import { LatLngExpression } from "leaflet";
import { useState, type FC } from "react";
import { Marker, Popup, useMapEvent } from "react-leaflet";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SelectionMarkerProps {}

export const SelectionMarker: FC<SelectionMarkerProps> = (props) => {
  const [selectedLocation, setSelectedLocation] = useState<LatLngExpression>();

  const map = useMapEvent("click", (e) => {
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
