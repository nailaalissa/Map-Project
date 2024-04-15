import React, { useState, useEffect } from 'react';

const Store = () => {
  const [storeInfo, setStoreInfo] = useState(null);

  useEffect(() => {
    fetch('/api-Store/1')
      .then((res) => res.json())
      .then((data) => {
        setStoreInfo(data);
        console.log(data); // Update state with fetched store information
      })
      .catch((error) => console.error('Error fetching store info:', error));
  }, []);

  return (
    <div>
      <h2>Store Information</h2>
      {storeInfo && (
        <div>
          <h1> Name : {storeInfo.locationDescriptor} </h1>
          <p>
            <strong>Store Name :</strong> {storeInfo.name}
          </p>

          <p>
            <strong>Store ID:</strong> {storeInfo.storeId}
          </p>
          <p>
            <strong>Description:</strong> {storeInfo.description.short}
          </p>
          <p>
            <strong>Location:</strong> Lat: {storeInfo.location.lat}, Lon: {storeInfo.location.lon}
          </p>
          <p>
            <strong>Address:</strong> {storeInfo.address.street}, {storeInfo.address.zip},{' '}
            {storeInfo.address.city}
          </p>
          <p>
            <strong>Contact:</strong> Email: {storeInfo.contact.email}
          </p>

          <h3>Open Hours</h3>
          <h3>Open Hours</h3>
          <ul>
            {Object.entries(storeInfo.openHours).map(([day, info]) => (
              <li key={day}>
                <strong>{day.toUpperCase()}: </strong>
                {info.state === 'Open' ? (
                  <>
                    {info.span.length > 0 && (
                      <span>
                        <br />
                        <span>Open {info.span[0].open}</span> - <span> {info.span[0].close}</span>
                      </span>
                    )}
                  </>
                ) : (
                  <span>Closed</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Store;
