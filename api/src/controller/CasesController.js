const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const [suspect_total] = await connection('users')
            .where('status', 'suspeito')
            .count();

        const [suspect_adress] = await connection('users')
            .where('status', 'suspeito')
            .select('adress');

        const [confirm_total] = await connection('users')
            .where('status', 'confirmado')
            .count();

        const [confirm_adress] = await connection('users')
            .where('status', 'confirmado')
            .select('adress');

        res.send({suspect_total, suspect_adress, confirm_total, confirm_adress})
    }
}