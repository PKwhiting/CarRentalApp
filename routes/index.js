const routes = require('express').Router();
const express = require('express');


routes.get('/', (req, res) => {
  res.send('Caleb Hansen');
});
routes.use('/users', require('./users'))
routes.use('/vehicles', require('./vehicles'))
routes.use('/', require('./swagger'))
module.exports = routes;