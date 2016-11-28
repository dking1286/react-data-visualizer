const express = require('express');
const path = require('path');

const ads = require('./ads');
const adsMetrics = require('./ads_metrics');

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.use(express.static(path.join(__dirname, '../client')));


app.get('/ads', (req, res) => {
  res.json(ads);
});

app.get('/ads_metrics', (req, res) => {
  res.json(adsMetrics);
});



