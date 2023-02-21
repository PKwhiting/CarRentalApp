const express = require('express');
const routes = express.Router();
const app = express(); 
const path = require('path');
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

routes.get('/', (req, res) => {
  res.render('index');
});
routes.use('/users', require('./users'))
routes.use('/vehicles', require('./vehicles'))
routes.use('/account', require('./account'))
routes.use('/', require('./swagger'))
module.exports = routes;