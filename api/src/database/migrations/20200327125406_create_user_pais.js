
exports.up = function(knex) {
    return knex.schema.createTable('user_pais', function(table){
        table.increments();
        table.string('pais_id').notNullable();
        table.string('user_id').notNullable();
        table.foreign('pais_id').references('id').inTable('paises');
        table.foreign('user_id').references('id').inTable('users');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('user_pais');
};
