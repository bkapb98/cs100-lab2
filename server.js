const express = require('express');
const path = require('path');
require('cross-fetch/polyfill');

// initialize universal constants 
const app = express();
const host = '127.0.0.1';
const port = 8000;
let comments = [];
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

// behavior for gallery route
app.get('/gallery/:gallery_id', (req, res) => {
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

// behavior for object route
app.get('/object/:object_id', (req, res) => {
  const objectId = req.params.object_id;
  const url = `https://api.harvardartmuseums.org/object?apikey=${API_KEY}&objectnumber=${objectId}`;
  fetch(url)
      .then(response => response.json())
      .then(data => {
          console.log(data.records);
          // add a blank string to people to avoid error if none exist
          if (!data.records[0].people) {
            data.records[0].people = [''];
          }
          
          // parses through all comments to return only relevant ones
          let object_comments = []; 
          comments.forEach(thought => {
            if (thought.id == objectId) { 
              object_comments.push(thought); 
            }
          });
          res.render('artifact', { object: data.records[0], comments: object_comments })
      });
});

// behavior for adding comments 
app.get('/add_comment/:objectId', (req, res) => { 
  const objectId = req.params.objectId;
  const newComment = req.query.comments;
  comments.push({id: objectId, text: newComment});
  res.redirect(`/object/${objectId}`);
});

app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}/`);
});
