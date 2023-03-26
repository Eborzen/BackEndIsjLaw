const {Article} = require('../../db/sequelize')
const {ValidationError, UniqueConstraintError, ForeignKeyConstraintError} = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.post('/codepenal/article', auth , (req, res) => {
        Article.create(req.body)
            .then(article => {
                const message = `le article ${req.body.libelle} a bien été crée`
                res.json({message , data : article})
            })
            
            .catch(error => {
                if(error instanceof (ValidationError || UniqueConstraintError || ForeignKeyConstraintError))
                    res.status(404).json({error, data:error.message})
                const message = "Erreur lors du traitement . Reesayer dans quelques instants"
                res.status(500).json({message, data: error})
            })
    })
}