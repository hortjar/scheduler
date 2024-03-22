import { useMemo, type FC } from "react";
import { useMap } from "react-leaflet";

export const SetUserLocation: FC = () => {
  const map = useMap();

  useMemo(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(pos);
      map.panTo({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, [map]);

  return <></>;
};
