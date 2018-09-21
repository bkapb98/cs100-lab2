const express = require('express');
const path = require('path');
require('cross-fetch/polyfill');

const app = express();
const host = '127.0.0.1';
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const API_KEY = "743ce3f0-b77e-11e8-bf0e-e9322ccde4db";

// behavior for the index route
app.get('/', (req, res) => {
  const url = `https://api.harvardartmuseums.org/gallery?size=100&apikey=${API_KEY}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    res.render('index', {galleries: data.records});
  });
});

app.get('/gallery/:gallery_id', function(req, res) {
  const galleryId = req.params.gallery_id;
  console.log(galleryId);
  const url = `https://api.harvardartmuseums.org/object?size=100&apikey=${API_KEY}&gallery=${galleryId}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data.records);
      res.render('objects', { objects: data.records });
  });
});

app.get('/object/:object_id', function (req, res) {
    const objectId = req.params.object_id;
    console.log(objectId);
    const url = `https://api.harvardartmuseums.org/object?apikey=${API_KEY}&object=${objectId}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data.records);
            res.render('artifact', { object: data.records[0] });
      });
});

app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}/`);
});
