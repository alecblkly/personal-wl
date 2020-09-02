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

module.exports = router;
