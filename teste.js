
const dotenv = require('dotenv');
const fs = require('fs');
const http = require('http');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const history = require('connect-history-api-fallback');
const helmet = require('helmet');

dotenv.config();

const port = process.env.PORT

const app = express();

app.use(cors());

app.use(express.json({ limit: '50mb' }));

app.use(session({ secret: process.env.SESSION_SECRET, resave: 'true', saveUninitialized: 'true' } ));

app.use(helmet.frameguard({ action: 'SAMEORIGIN' }));

app.use(passport.initialize());

app.use(passport.session());

require('./server/routes')(app);

const staticFileMiddleware = express.static(path.join(__dirname));

app.use(history());

app.use(staticFileMiddleware);

app.use('/', express.static('./public'));

if (process.env.NODE_ENV === 'local') {

  // Create a local server to receive data from
  http.createServer(app).listen(port, function (req, res) {
    console.log(`**** http LOCAL \nListening on port ${port}`);
    console.log('http://localhost:' + port);
  });

} else {

  app.listen(process.env.PORT, () => {
    console.log(`**** http ${process.env.NODE_ENV} Listening on port ${port}`);
  });

}

module.exports = app;



