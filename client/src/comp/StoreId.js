import React, { useState, useEffect } from 'react';

const Store = () => {
  const [storeId, setStoreId] = useState('1');
  const [storeInfo, setStoreInfo] = useState(null);

  const handleInputChange = (event) => {
    setStoreId(event.target.value);
  };

  const fetchStoreInfo = (storeId) => {
    // fetch Store info by select the Id from page.
    fetch(`/api-Store/${storeId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        // console.log('Fetched data:', data); // Log the fetched data
        setStoreInfo(data);
      })
      .catch((error) => console.error('Error fetching store info:', error));
  };

  useEffect(() => {
    fetchStoreInfo(storeId);
  }, [storeId]);

  return (
    <div style={{ margin: '40px' }}>
      <h2>Store Information</h2>
      <label htmlFor="storeIdInput">Enter Store ID:</label>
      {/* Input field to seletc the Store Id ..===> should change it to click in map  */}
      <input type="text" id="storeIdInput" value={storeId} onChange={handleInputChange} />

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
