const { Article } = require('../../db/sequelize')
const {ValidationError, UniqueConstraintError, ForeignKeyConstraintError} = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.put('/codepenal/article/:id', auth , (req, res) => {
        const id = req.params.id
        Article.update(req.body, {
            where: { id_article: id }
        })
            .then(_ => {
                 return Article.findByPk(id).then(article => {
                    if (article === null) {
                        const message = "La ressource demandée n'existe pas . Réessayer avec un autre identifiant"
                        return res.status(404).json({ message })
                    }
                    const message = `le Article ${req.body.id_article} a bien été mis à jour`
                    res.json({ message, data: article })
                })

            })
            .catch(error => {
                if(error instanceof (ValidationError || UniqueConstraintError || ForeignKeyConstraintError))
                    res.status(404).json({error, data:error.message})
                const message = "Erreur lors du traitement . Reesayer dans quelques instants"
                res.status(500).json({message, data: error})
            })
    })
}