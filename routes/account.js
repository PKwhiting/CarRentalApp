const express = require('express');
const router = express.Router();
const usersController = require('../controllers/account');
const app = express(); 
const path = require('path');
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');


  router.get('/:id', (req, res, next) => {
    usersController.getSingleUser(req, res)
      .then(user => {
        if (user) {
          res.render('edit-user', { user });
        } else {
          res.status(404).send('User not found');
        }
      })
      .catch(err => {
        res.status(500).send('Error getting user');
      });
  });
  



module.exports = router;