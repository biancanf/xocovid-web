
exports.up = function(knex) {
    return knex.schema.createTable('sintomas', function(table){
        table.increments();
        table.string('sintoma').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('sintomas')
};
