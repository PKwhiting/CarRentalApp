const express = require('express');
const app = express();
app.set('view engine', 'pug');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = process.env.PORT || 10000;
const path = require('path');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/', require('./routes'))

app.get('/styles/index.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile('styles/index.css', { root: __dirname });
  });

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})