const {Section} = require('../../db/sequelize')
const {ValidationError,UniqueConstraintError,ForeignKeyConstraintError} = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.post('/codepenal/section', auth, (req, res) => {
        Section.create(req.body)
            .then(section => {
                const message = `la Section ${req.body.libelle} a bien été crée`
                res.json({message , data : section})
            })
            .catch(error => {
                if(error instanceof (ValidationError || UniqueConstraintError || ForeignKeyConstraintError))
                    res.status(404).json({error, data:error.message})
                const message = "Erreur lors du traitement . Reesayer dans quelques instants"
                res.status(500).json({message, data: error})
            })
    })
}