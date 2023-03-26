const { ValidationError, UniqueConstraintError, ForeignKeyConstraintError } = require('sequelize')
const {Livre} = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.post('/codepenal/livre', auth, (req, res) => {
        Livre.create(req.body)
            .then(livre => {
                const message = `le livre ${req.body.libelle} a bien été crée`
                res.json({message , data : livre})
            })
            .catch(error => {
                if(error instanceof (ValidationError || UniqueConstraintError || ForeignKeyConstraintError)){
                    res.status(404).json({error, data:error.message})
                }
                const message = "Erreur lors du traitement . Reesayer dans quelques instants"
                res.status(500).json({message, data: error})
            })
    })
}