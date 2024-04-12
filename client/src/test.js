// import './App.css';
// import React, { useState, useEffect } from 'react';
// import AddMapbox from './AddMapbox';

// function App() {
//   const [data, setData] = useState(null);
//   const [mapapi, setMapapi] = useState(null);
//   useEffect(() => {
//     fetch('/api')
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data);
//         console.log(data);
//       })
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);
//   useEffect(() => {
//     fetch('/mapApi')
//       .then((res) => res.json())
//       .then((data) => {
//         setMapapi(data);
//         console.log(data);
//       })
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);

//   return (
//     <div className="App">
//       <header>
//         <p> {mapapi}</p>
//         <p>{!data ? 'Loading...' : renderDirections(data)}</p>
//       </header>
//       <AddMapbox />
//     </div>
//   );
// }
// function renderDirections(data) {
//   if (!data || data.length === 0) {
//     return 'No directions available';
//   }

//   return (
//     <ul>
//       {data.map((direction, index) => (
//         <li key={index}>
//           <strong>Name:</strong> {direction.name},<strong>Address:</strong>{' '}
//           {renderAddress(direction.address)}, <strong>Coordinates:</strong>{' '}
//           {direction.coordinates.join(', ')}
//         </li>
//       ))}
//     </ul>
//   );
// }

// function renderAddress(address) {
//   return `${address.street}, ${address.zip}, ${address.city}, ${address.state}, ${address.country}, ${address.countryAlpha2Code}`;
// }
// export default App;
// App.js
import React from 'react';
import Map from './Map';

function App() {
  return (
    <div className="App">
      <header className="App-header">MAb box</header>

      <Map />
    </div>
  );
}

export default App;
