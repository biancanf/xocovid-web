const connection = require('../database/connection');
const crypto = require('crypto-js');

module.exports = {
    async index(req, res) {
        const users = await connection('users').select('*');

        return res.json(users)
    },

    async create(req, res) {
        const {
            name,
            email,
            adress,
        } = req.body;

        password = crypto.AES.encrypt(req.body.password, 'secret key 123').toString();

        const [count] = await connection('users').where('email', email).count();

        if (count['count(*)'] === 1)
            return res.status(400).json({
                error: 'your email is already registered'
            })

        const [id] = await connection('users').insert({
            name,
            email,
            adress,
            password
        });

        return res.json({
            id
        })

    },
    async update(req, res) {
        
        const status = req.body.status;

        const id = req.headers.authorization;

        if (status === 'mal') {
            const {
                sintomas,
                suspect_case_contact,
                confirmed_case_contact,
                another_country,
                paises,
            } = req.body;

            await connection('users').where('id', id).update({
                'status': 'suspeito',
                'suspect_case_contact': suspect_case_contact,
                'confirmed_case_contact': confirmed_case_contact,
                'another_country': another_country,
            });

            //fazer insert de sintomas na tabela sintomas e na tabela user_sintomas
            // fazer insert de paises e user_paises

            return res.status(204).send();
        }

        await connection('users').where('id', id).update({
            'status': 'saudável',
            'suspect_case_contact': null,
            'confirmed_case_contact': null,
            'another_country': null,
        });

        //deletar registros de user_sintomas e user_paises

        res.status(204).send();

    },
    async delete(req, res) {
        const id = await connection('users').delete();

        return res.json(id);
    }

}