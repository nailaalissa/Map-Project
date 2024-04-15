// Map.js
import React, { useState, useEffect } from 'react';
import AddMapbox from './AddMapbox';

const Map = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <div class="flexbox">
        <div id="info">
          <p>{!data ? 'Loading...' : renderDirections(data)}</p>
        </div>
        <div id="map">
          <AddMapbox directions={data} />
        </div>
      </div>
    </>
  );
};

function renderDirections(data) {
  if (!data || data.length === 0) {
    return 'No directions available';
  }

  return (
    <ul>
      {data.map((direction, index) => (
        <li key={index}>
          <strong>Name:</strong> {direction.name}, <strong>Address:</strong>{' '}
          {renderAddress(direction.address)}, <strong>Coordinates:</strong>{' '}
          {direction.coordinates.join(', ')}
        </li>
      ))}
    </ul>
  );
}

function renderAddress(address) {
  return `${address.street}, ${address.zip}, ${address.city}, ${address.state}, ${address.country}, ${address.countryAlpha2Code}`;
}

export default Map;
