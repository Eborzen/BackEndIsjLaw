const { User } = require('../db/sequelize')
const  bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/Private_key')

module.exports = (app) => {
    app.post('/login', (req, res) => {
        User.findOne({
            where: {
                username: req.body.username
            }
        })
            .then(user => {
                if (!user) {
                    const message = "L'utilisateur demandé n'existe pas"
                    res.status(404).json({ message })
                }

                bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                    if (!isPasswordValid) {
                        const message = "Le mot de passe est incorrect";
                        return res.status(401).json({ message })
                    }
                    if (isPasswordValid) {
                        //JWT
                        const token = jwt.sign(
                            {userId: user.id,},
                            privateKey,
                            {expiresIn: '24h'}
                        )
                        const message = "L'utilisateur est connecté avec succès";
                        return res.json({ message, data: user, token })
                    }
                })
        })
        .catch(error => {
            message = "L'utilisateur n'a pas pu se connecter. Réessayer dans quelques instants"
            res.json({message, data:error})
        })
    })
}