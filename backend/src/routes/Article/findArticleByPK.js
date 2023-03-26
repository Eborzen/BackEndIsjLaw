const { Article, Alinea } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/codepenal/article/:id', auth , (req, res) => {
        const id = req.params.id
        Article.findByPk(id)
            .then(article => {
                if (article === null) {
                    const message = "La ressource demandée n'existe pas. Essayer avec un autre identifiant"
                    res.status(404).json({ message })
                }
                else {
                  return  Article.findAll({
                        include: Alinea,
                        where: {
                            id_article: id
                        }
                    })
                }
            })
            .then(article => {
                const message = 'La liste des articles a bien été récupéré.'
                res.json({ message, data: article })
            })
            .catch(error =>{
                const message = "La liste des aricles n'a pas pu être recupérée. Réessayer dans quelques instants."
                res.status(500).json({message, data: error})
            })
    })
}