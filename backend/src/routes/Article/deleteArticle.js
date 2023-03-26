const { Article } = require('../../db/sequelize')

module.exports = (app) => {
    app.delete('/codepenal/article/:id', (req, res) => {
        Article.findByPk(req.params.id).then(article => {
            if (article === null) {
                const message = "La ressource demandée n'existe pas . Réessayer avec un autre identifiant"
                return res.status(404).json({ message })
            }
            const ArticleDeleted = article;
            return Article.destroy({
                where: { id_article: article.id_article }
            })
                .then(_ => {
                    const message = `L' article avec l'identifiant ${ArticleDeleted.id_article} a bien été supprimé`
                    res.json({ message, data: ArticleDeleted })
                })
                .catch(error => {
                    const message = "Erreur lors du traitement de la requête . Reessayer dans quelques instants"
                    res.status(500).json({message, data: error})
                })
        })
    })
}