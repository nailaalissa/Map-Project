const { param } = require('../routes');
const { getTokens, getLocations } = require('./fetchApi');
exports.getStore = async (req, res) => {
  const storeId = req.params.storeId;
  const url = process.env.PINMETO_API_URL;
  const appId = process.env.PINMETO_APP_ID;
  const appSecret = process.env.PINMETO_APP_SECRET;
  const accountId = process.env.PINMETO_ACCOUNT_ID;
  const locationsUrl = `https://api.test.pinmeto.com/v2/${accountId}/locations/${storeId}`;

  try {
    const accessToken = await getTokens(url, appId, appSecret);
    const storeInfo = await getLocations(locationsUrl, accessToken);
    res.status(200).json(storeInfo);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getLocations = async (req, res) => {
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
    res.status(200).json(directions);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createLocation = async (req, res) => {
  try {
    const appId = process.env.PINMETO_APP_ID;
    const appSecret = process.env.PINMETO_APP_SECRET;
    const accountId = process.env.PINMETO_ACCOUNT_ID;
    const locationData = req.body;
    const url = `https://api.pinmeto.com/v2/${accountId}/locations`;

    const accessToken = await getTokens(url, appId, appSecret);
    const authentication = Buffer.from(`${appId}:${appSecret}`).toString('base64'); // Base64 encode

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authentication}`,
      },
      body: JSON.stringify(locationData),
    };

    console.log('Request headers:', options.headers); // Log headers

    const response = await fetch(url, options);

    const responseData = await response.json();
    console.log('Location created:', responseData);
    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error creating location:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
