exports.up = function (knex) {
   return knex.schema.createTable('users', (users) => {
      users.increments();

      users.string('username', 63).notNullable().unique();
      users.string('email', 254).notNullable().unique;
      users.string('password', 63).notNullable();
   });
};

exports.down = function (knex) {
   return knex.schema.dropTableIfExists('users');
};
