const express = require('express');
const app = express();
var cfenv = require("cfenv")

var appEnv = cfenv.getAppEnv();

var port = appEnv.port || 3000;

var bodyParser = require('body-parser');
 
const db = require('./app/config/db.config.js');
  
//force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
}); 

// db.sequelize.sync().then(() => {
//   console.log('Drop and Resync with { force: true }');
// });

let router = require('./app/routers/router.js');

const cors = require('cors')
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/', router);

// Create a Server

app.listen(port, appEnv.bind, function() {
  console.log("server starting on " + appEnv.url)
  console.log("server starting on port" + port)
})