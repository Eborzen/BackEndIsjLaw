const { Chapitre, Section, Article, Alinea } = require('../../db/sequelize')

module.exports = (app) => {
    app.get('/codepenal/chapitre',  (req, res) => {
        Chapitre.findAll({
            include: [{
                model: Section,
                include: [{
                    model: Article,
                    include: {
                        model: Alinea
                    }
                }]
            }]
        })
            .then(chapitre => {
                const message = 'La liste des chapitres a bien été récupéré.'
                res.json({ message, data: chapitre })
            })
            .catch(error =>{
                const message = "La liste des chapitres n'a pas pu être recupérée. Réessayer dans quelques instants."
                res.status(500).json({message, data: error})
            })
    })
}