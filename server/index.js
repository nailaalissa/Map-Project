// server/index.js
require('dotenv').config();
const express = require('express');
const router = require('./routes');

const PORT = process.env.PORT || 3001;

const app = express();
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
