const {Titre, Alinea, Article, Chapitre, Section} = require('../../db/sequelize')

module.exports = (app) => {
    app.get('/codepenal/titre', (req, res) => {
        Titre.findAll({
            include : [{
                model : Chapitre,
                include : [{
                    model : Section,
                    include : [{
                        model : Article,
                        include : {
                            model : Alinea,   
                        }
                    }]
                }]

            }]
         })
            .then(titre => {
                const message = 'La liste des titres a bien été récupéré.'
                res.json({ message, data: titre })
            })
            .catch(error =>{
                const message = "La liste des titres n'a pas pu être recupérée. Réessayer dans quelques instants."
                res.status(500).json({message, data: error})
            })
    })
}