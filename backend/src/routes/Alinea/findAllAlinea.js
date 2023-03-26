const {Alinea} = require('../../db/sequelize')

module.exports = (app) => {
    app.get('/codepenal/alinea', (req, res) => {
        Alinea.findAll()
            .then(alinea => {
                const message = 'La liste des alineas a bien été récupéré.'
                res.json({ message, data: alinea })
            })
            .catch(error =>{
                const message = "La liste des alinéas n'a pas pu être recupérée. Réessayer dans quelques instants."
                res.status(500).json({message, data: error})
            })
    })
}