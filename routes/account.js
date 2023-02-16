const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const app = express(); // create an instance of express app
app.set('view engine', 'pug'); // set the view engine for the app


router.get('/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await usersController.getsingleuser(userId);
      res.render('edit-user', { user });
    } catch (err) {
      res.status(500).send('Error retrieving user data');
    }
});
  


module.exports = router;