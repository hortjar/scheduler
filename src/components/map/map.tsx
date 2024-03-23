// src/components/Map.tsx
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { LatLng, LatLngExpression } from "leaflet";
import { SelectionMarker } from "./selection-marker";
import { SetUserLocation } from "./set-user-location";

interface MapProps {
  // eslint-disable-next-line no-unused-vars
  locationSelected(latLong: LatLng): void;
}

export default function Map(props: MapProps) {
  const defaultCenter: LatLngExpression = {
    lat: 51.505,
    lng: -0.09,
  };
  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SetUserLocation />
      <SelectionMarker locationSelected={props.locationSelected} />
    </MapContainer>
  );
}
