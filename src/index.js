var express = require('express');
var bodyParser = require('body-parser')
const cors = require('cors')
var app = express();
var routes = require('./routes')

const port = 8000

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.json());

app.use('/', routes)

app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`)
})