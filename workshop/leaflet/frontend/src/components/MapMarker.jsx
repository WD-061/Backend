import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const MapMarker = ({ user }) => {
  const position = user.address.location.coordinates.toReversed();

  const icon = L.icon({
    iconUrl: user.displayImg,
    iconSize: [48, 48],
    className: 'rounded-full',
  });

  return (
    <Marker position={position} icon={icon}>
      <Popup>
        <h3>{user.firstName}</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit,
          labore.
        </p>
      </Popup>
    </Marker>
  );
};

export default MapMarker;
