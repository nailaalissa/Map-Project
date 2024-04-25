import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const AddMapbox = ({ directions }) => {
  const [mapboxApiToken, setMapboxApiToken] = useState(null);
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    // get the MapBox Key to show the map
    fetch('/mapApi')
      .then((res) => res.json())
      .then((data) => {
        // console.log('Data received:', data);
        if (data.mapboxApiToken) {
          mapboxgl.accessToken = data.mapboxApiToken;
          setMapboxApiToken(data.mapboxApiToken);
        } else {
          console.error('Mapbox API token not found in response.');
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (!map.current && mapboxApiToken) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [13.30389, 55.839028],
        zoom: 9,
      });

      map.current.on('load', () => {
        if (directions) {
          directions.forEach((direction) => {
            new mapboxgl.Marker()
              .setLngLat(direction.coordinates)
              .setPopup(new mapboxgl.Popup().setHTML(direction.name))
              .addTo(map.current);
          });
        }
      });
    }
  }, [directions, mapboxApiToken]);

  if (mapboxApiToken === null) {
    return <div>Loading...</div>;
  }

  return <div ref={mapContainer} className="map-container" />;
};

export default AddMapbox;
