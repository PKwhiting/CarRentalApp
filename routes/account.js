const express = require('express');
const router = express.Router();
const axios = require('axios');
const usersController = require('../controllers/account');
const app = express(); 
const path = require('path');
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

router.get('/', (req, res) => {
  res.render('login');
});




router.get('/auth', (req,res) =>{
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`
  )
});
router.get('/oauth-callback', ({ query: { code } } , res) => {
  const body = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code,
  };
  const opts = { headers: { accept: 'application/json' } };
  
  axios
    .post('https://github.com/login/oauth/access_token', body, opts)
    .then((_res) => _res.data.access_token )
    .then((token) => {
      console.log('My Token: ' , token);
      res.redirect(`/?token=${token}`)
    })
    .catch((err) => res.status(500).json({ err: err.message}))
})



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

router.post('/:id', (req, res, next) => {
  usersController.updateUser(req, req.body)
      .then(() => {
          res.redirect('/users');
      })
      .catch(err => {
          res.status(500).send('Error updating user');
      });
});

  
module.exports = router;