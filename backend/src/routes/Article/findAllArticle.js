const {Article, Alinea } = require('../../db/sequelize')
const {Op} = require('sequelize')

module.exports = (app) => {
    app.get('/codepenal/article', (req, res) => {
        if(req.query.libelle){
            const name = req.query.libelle
            return Article.findAndCountAll({
                include : Alinea,
                where : {
                    libelle : {
                        [Op.like] : `%${name}%`
                    }
                },
                limit : 5,
                order: ['libelle']
            })
            .then(({count ,rows}) => {
                const message = `Il y'a ${count} articles dans cette recherche sur ${name}`
                res.json({message, data: rows})
            })
        }
        else{
            Article.findAll({include : Alinea, order: ['libelle']})
            .then(article => {
                const message = 'La liste des articles a bien été récupéré.'
                res.json({ message, data: article })
            })
            .catch(error =>{
                const message = "La liste des aricles n'a pas pu être recupérée. Réessayer dans quelques instants."
                res.status(500).json({message, data: error})
            })
        }
        
    })
}