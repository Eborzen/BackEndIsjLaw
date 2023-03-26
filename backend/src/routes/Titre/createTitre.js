const {Titre} = require('../../db/sequelize')
const {ValidationError, UniqueConstraintError, ForeignKeyConstraintError, DatabaseError} = require('sequelize')

module.exports = (app) => {
    app.post('/codepenal/titre', (req, res) => {
        Titre.create(req.body)
            .then(titre => {
                const message = `le titre ${req.body.libelle} a bien été crée`
                res.json({message , data : titre})
            })
            .catch(error => {
                if(error instanceof (ValidationError || UniqueConstraintError || ForeignKeyConstraintError))
                    res.status(404).json({error, data:error.message})
                const message = "Erreur lors du traitement . Reesayer dans quelques instants"
                res.status(500).json({message, data: error})
            })
    })
}