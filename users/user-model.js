const db = require('../data/dbConfig');

module.exports = {
   find,
   findByID,
   add,
};

function find() {
   return db('users').select('id', 'username');
}

function findByID(user) {
   return db('users').select('id', 'username').where(user);
}

function add(user) {
   return db('users')
      .insert(user, 'id')
      .then((ids) => {
         const [id] = ids;
         return findByID(id);
      });
}
