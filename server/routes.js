const express = require('express');
const { getTokens, getLocations } = require('./apiController/fetchApi.js');
const router = express.Router();

router.get('/api', async (req, res) => {
  const url = process.env.PINMETO_API_URL;
  const appId = process.env.PINMETO_APP_ID;
  const appSecret = process.env.PINMETO_APP_SECRET;
  const accountId = process.env.PINMETO_ACCOUNT_ID;
  const locationsUrl = `https://api.test.pinmeto.com/v2/${accountId}/locations`;

  try {
    const accessToken = await getTokens(url, appId, appSecret);
    const locations = await getLocations(locationsUrl, accessToken);

    const directions = locations.map((location) => ({
      name: location.name,
      coordinates: [location.location.lat, location.location.lon],
      address: location.address,
    }));
    // console.log(directions);
    res.json(directions);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// router.get('/mapApi', async (req, res) => {
//   try {
//     const mapApi = process.env.MAPBOX_API_TOKEN;
//     res.json(mapApi);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
router.get('/mapApi', async (req, res) => {
  try {
    const mapApi = process.env.MAPBOX_API_TOKEN;
    res.json({ mapboxApiToken: mapApi }); // Return the token as an object
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
