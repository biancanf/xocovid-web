
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table){
      table.increments();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.string('status'); 
      table.boolean('suspect_case_contact');
      table.boolean('confirmed_case_contact');
      table.boolean('another_country');
      table.string('passwordResetToken');
      table.string('adress').notNullable();
      table.datetime('passwordResetExpires');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
