"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { LatLng, LatLngExpression } from "leaflet";
import { SelectionMarker } from "./selection-marker";
import { SetUserLocation } from "./set-user-location";
import { DefaultMarker } from "./default-marker";
import { Coordinates } from "@/server/db/schema";

interface MapProps {
  locationSelected?(latLong: LatLng): void;
  defaultLocation?: Coordinates;
}

export default function Map(props: MapProps) {
  const defaultCenter: LatLngExpression = props.defaultLocation
    ? {
        lat: props.defaultLocation.latitude,
        lng: props.defaultLocation.longitude,
      }
    : {
        lat: 51.505,
        lng: -0.09,
      };

  console.log("default center", defaultCenter);

  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      scrollWheelZoom={true}
      className="h-full w-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SetUserLocation />
      {props.locationSelected && (
        <SelectionMarker locationSelected={props.locationSelected} />
      )}
      {props.defaultLocation && <DefaultMarker location={defaultCenter} />}
    </MapContainer>
  );
}
