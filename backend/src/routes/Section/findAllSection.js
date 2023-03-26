const { Section, Article, Alinea } = require('../../db/sequelize')

module.exports = (app) => {
    app.get('/codepenal/section', (req, res) => {
        Section.findAll({
            include: [{
                model: Article,
                include: [{
                    model: Alinea,
                }]
            }]
        })
            .then(sections => {
                const message = 'La liste des Sections a bien été récupéré.'
                res.json({ message, data: sections })
            })
            .catch(error =>{
                const message = "La liste des sections n'a pas pu être recupérée. Réessayer dans quelques instants."
                res.status(500).json({message, data: error})
            })
    })
}