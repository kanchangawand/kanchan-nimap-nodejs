const express = require('express');
const app = express();
var cfenv = require("cfenv")

var appEnv = cfenv.getAppEnv()

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
const server = app.listen(3000, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port); 
})

// app.listen(appEnv.port, appEnv.bind, function() {
//   console.log("server starting on " + appEnv.url)
//   console.log("server starting on port" + appEnv.port)
// })