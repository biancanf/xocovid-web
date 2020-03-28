
exports.up = function(knex) {   
    return knex.schema.createTable('user_sintomas', function(table){
        table.increments();
        table.string('sintoma_id').notNullable();
        table.string('user_id').notNullable();
        table.foreign('sintoma_id').references('id').inTable('sintomas');
        table.foreign('user_id').references('id').inTable('users');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('user_sintomas');
};
