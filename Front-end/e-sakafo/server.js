
let app = require('./Back-end/app');
// Start the app by listening on the default Heroku port
let port = process.env.PORT || 3000;

let server = app.listen(port, function () {
  console.log('Express server listening on port ' + port);
  const all_routes = require('express-list-endpoints');
  console.log(all_routes(app));
});