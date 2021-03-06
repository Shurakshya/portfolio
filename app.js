require('dotenv').load();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const path = require('path');
const bodyParser = require("body-parser");

var routesApi = require('./server/api_route');

const app = express();

//force use of https for production level 
const https_redirect = function(req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] != 'https') {
      return res.redirect('https://' + req.headers.host + req.url);
    } else {
      return next();
    }
  } else {
    return next();
  }
};

app.use(https_redirect);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Handles all routes so you do not get a not found error
app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public', 'error.html'))
});
app.get('/', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});
app.use('/api', routesApi);
app.use((req, res, next)=>{
    // console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
    next();
});


app.listen(process.env.PORT || 3000,()=>{
	console.log("Express app running on port 3000");
});

module.exports = app;