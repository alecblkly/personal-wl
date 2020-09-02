exports.up = function (knex) {
   return knex.schema.createTable('users', (user_table) => {
      user_table.increments();

      user_table.string('username', 63).notNullable().unique();
      user_table.string('email', 254).notNullable().unique();
      user_table.string('password', 63).notNullable();
   });
};

exports.down = function (knex) {
   return knex.schema.dropTableIfExists('users');
};
