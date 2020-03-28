
exports.up = function(knex) {
    return knex.schema.createTable('paises', function(table){
        table.increments();
        table.string('pais').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('paises');
};
