const express = require('express');
const path = require('path');
let app = require('./Back-end/app');

// Serve only the static files form the dist directory
app.use(express.static('./dist/Front-end'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', { root: 'dist/Front-end/' }),
);
// Start the app by listening on the default Heroku port
let port = process.env.PORT || 3000;

let server = app.listen(port, function () {
  console.log('Express server listening on port ' + port);
  const all_routes = require('express-list-endpoints');
  console.log(all_routes(app));
});