// AddMapbox.js
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = ' '; // put the mapbox key hier

const AddMapbox = ({ directions }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!map.current) {
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
  }, [directions]);

  return <div ref={mapContainer} className="map-container" />;
};

export default AddMapbox;
