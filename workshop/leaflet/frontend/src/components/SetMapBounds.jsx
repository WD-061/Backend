import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

const SetMapBounds = ({ userCoordinates }) => {
  const map = useMap();

  useEffect(() => {
    if (userCoordinates.length > 1) {
      map.fitBounds(userCoordinates);
    } else if (userCoordinates.length === 1) {
      map.setView(userCoordinates[0], 13);
    }
  }, [userCoordinates, map]);

  return null;
};

export default SetMapBounds;
