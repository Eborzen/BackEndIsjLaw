const {Chapitre} = require('../../db/sequelize')
const {ValidationError,UniqueConstraintError,ForeignKeyConstraintError} = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.post('/codepenal/chapitre', auth , (req, res) => {
        Chapitre.create(req.body)
            .then(chapitre => {
                const message = `le chapitre ${req.body.libelle} a bien été crée`
                res.json({message , data : chapitre})
            })
            .catch(error => {
                if(error instanceof (ValidationError || UniqueConstraintError || ForeignKeyConstraintError))
                    res.status(404).json({error, data:error.message})
                const message = "Erreur lors du traitement . Reesayer dans quelques instants"
                res.status(500).json({message, data: error})
            })
    })
}