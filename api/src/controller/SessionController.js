const connection = require('../database/connection');
const cryptoJs = require('crypto-js');
const crypto = require('crypto');
const mailer = require('../modules/mailer');

module.exports = {
    async index(req, res) {
        const id = req.headers.authorization;

        const user = await connection('users')
            .where('id', id)
            .select([
                'name',
                'status', 
                'adress'
            ]);

        res.send(user);
    },
    async create(req, res) {
        const {
            email,
            password
        } = req.body;

        const user = await connection('users')
            .where({
                'email': email
            })
            .select('password')
            .first();

        if (!user || cryptoJs.AES.decrypt(user.password, 'secret key 123').toString(cryptoJs.enc.Utf8) !== password)
            return res.status(400).json({
                error: 'incorrect password or email'
            });

        return res.status(204).send();
    },
    async forgot_password(req, res) {
        const {
            email
        } = req.body;

        try {

            const user = await connection('users').where('email', email).select('*');

            if (!user)
                return res.status(400).send({
                    error: 'User not found'
                });

            const token = crypto.randomBytes(20).toString('HEX');

            const now = new Date();
            now.setHours(now.getHours() + 1);

            await connection('users')
                .where('email', email)
                .update({
                    'passwordResetToken': token,
                    'passwordResetExpires': now
                });

            mailer.sendMail({
                to: email,
                from: 'bianca.nunes1175@gmail.com',
                template: 'auth/forgot_password',
                context: {
                    token
                },

            }, (err) => {
                if (err) {
                    return res.status(400).send({
                        error: 'Cannot send forgot password email'
                    })
                }
                res.status(204).send();
            });

            res.status(204).send();

        } catch (error) {
            res.status(400).send({
                error: 'Erro on forgot password, try again'
            });
        }
    },
    async reset_password(req, res) {
        const {
            email,
            token
        } = req.body;

        try {
            const [user] = await connection('users').where('email', email).select(['users.passwordResetToken', 'users.passwordResetExpires']);

            if (!user)
                return res.status(400).send({
                    error: 'User not found'
                });

            if (token !== user.passwordResetToken)
                return res.status(400).send({
                    error: 'Token invalid'
                });

            const now = new Date();

            if (now > user.passwordResetExpires)
                return res.status(400).send({
                    error: 'Token expired, generate a new one'
                })

            const password = cryptoJs.AES.encrypt(req.body.password, 'secret key 123').toString();

            const user2 = await connection('users').where('email', email).update('password', password);

            return res.json(user2);
        } catch (error) {
            console.log(error)
            res.status(400).send({
                error: 'Cannot reset password, try again'
            })
        }
    }
}