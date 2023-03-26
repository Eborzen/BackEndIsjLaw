const {Livre, Titre, Alinea, Article, Chapitre, Section} = require('../../db/sequelize')

module.exports = (app) => {
    app.get('/codepenal/livre', (req, res) => {
         Livre.findAll({
            include : [{
                model : Titre,
                include : [{
                    model : Chapitre,
                    include : [{
                        model : Section,
                        include : [{
                            model : Article,
                            include : [{
                                model : Alinea
                            }]
                        }]
                    }]
                }]

            }]
         })
             .then(livre => {
                 const message = 'La liste des livres a bien été récupéré.'
                 res.json({ message, data: livre })
             })
             .catch(error =>{
                const message = "La liste des livres n'a pas pu être recupérée. Réessayer dans quelques instants."
                res.status(500).json({message, data: error})
            })
        
    })
}