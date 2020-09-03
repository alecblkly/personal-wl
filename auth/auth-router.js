const router = require('express').Router();
const bcrypt = require('bcrypt');

const Users = require('../users/user-model');
const { validateUser } = require('../users/user-helper');

router.post('/register', (req, res) => {
   let user = req.body;

   const validateResult = validateUser(user);

   if (validateResult.isSuccessful === true) {
      const hash = bcrypt.hashSync(user.password, 13);
      user.password = hash;

      Users.add(user)
         .then((registered) => {
            res.status(201).json(
               `The following user has been created: ${registered.username}`
            );
         })
         .catch((error) => {
            res.status(500).json(
               `There was an error with registration: ${error}.`
            );
         });
   } else {
      res.status(400).json({
         message: 'Invalid registration information.',
         errors: validateResult.errors,
      });
   }
});

router.post('/login', (req, res) => {
   let { username, password } = req.body;

   Users.findByUser({ username })
      .first()
      .then((user) => {
         if (user && bcrypt.compareSync(password, user.password)) {
            req.session.username = user.username;
            res.status(200).json({
               message: `${user.username}`,
               id: `${user.id}`,
            });
         } else {
            res.status(401).json({
               message: 'Invalid credentials, please try again.',
            });
         }
      })
      .catch((error) => {
         res.status(500).json({
            message: `There was an error with login: ${error}`,
         });
      });
});

module.exports = router;
