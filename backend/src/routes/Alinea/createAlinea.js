const {Alinea} = require('../../db/sequelize')
const{ ForeignKeyConstraintError, ValidationError } = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.post('/codepenal/alinea', auth, (req, res) => {
        Alinea.create(req.body)
            .then(alinea => {
                const message = `l'alinea ${req.body.id_alinea} a bien été crée`
                res.json({message , data : alinea})
            })
            .catch(error => {
                if(error instanceof (ValidationError || UniqueConstraintError || ForeignKeyConstraintError))
                    res.status(404).json({error, data:error.message})
                const message = "Erreur lors du traitement . Reesayer dans quelques instants"
                res.status(500).json({message, data: error})
            })
    })
}