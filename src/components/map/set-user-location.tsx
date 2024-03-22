import { useMemo, type FC } from "react";
import { useMap } from "react-leaflet";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SetUserLocationProps {}

export const SetUserLocation: FC<SetUserLocationProps> = (props) => {
  const map = useMap();

  useMemo(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(pos);
      map.panTo({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  return <></>;
};
