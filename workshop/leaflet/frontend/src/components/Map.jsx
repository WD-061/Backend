import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getUsers } from '../data/user';
import MapMarker from './MapMarker';
import SetMapBounds from './SetMapBounds';

const Map = () => {
  const [users, setUsers] = useState([]);
  const [radius, setRadius] = useState(5);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(radius);
        setUsers(data);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchUsers();
  }, [radius]);

  const userCoordinates = users.map((user) =>
    user.address.location.coordinates.toReversed()
  );
  console.log(userCoordinates);

  return (
    <>
      <label className='input bg-amber-900'>
        Radius
        <input
          type='number'
          className='grow '
          min={1}
          value={radius}
          onChange={(event) => setRadius(event.target.value)}
        />
        <span className='badge badge-neutral badge-xs'>km</span>
      </label>
      <MapContainer
        center={[52.457131, 13.54007]}
        zoom={13}
        className='h-[70vh]'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <SetMapBounds userCoordinates={userCoordinates} />
        {users.map((user) => (
          <MapMarker key={user._id} user={user} />
        ))}
      </MapContainer>
    </>
  );
};

export default Map;
