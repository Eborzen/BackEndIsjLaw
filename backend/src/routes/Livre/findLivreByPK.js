const { Livre, Titre, Alinea, Article, Chapitre, Section } = require('../../db/sequelize')

module.exports = (app) => {
    app.get('/codepenal/livre/:id', (req, res) => {
        const id = req.params.id
        Livre.findByPk(id)
            .then(livre => {
                if (livre === null) {
                    const message = "La ressource demandée n'existe pas . Reesayez avec un autre identifiant"
                    res.status(404).json({ message })
                }
                else {
                    Livre.findAll({
                        include: [{
                            model: Titre,
                            include: [{
                                model: Chapitre,
                                include: [{
                                    model: Section,
                                    include: [{
                                        model: Article,
                                        include: [{
                                            model: Alinea
                                        }]
                                    }]
                                }]
                            }]

                        }],
                        where: {
                            id_livre: id
                        }
                    })
                        .then(livre => {
                            const message = `Le Livre ${req.params.id} a été trouvée`
                            res.json({ message, data: livre })
                        })
                        .catch(error => {
                            const message = "Erreur lors de la requête. Reessayer dans quelques instants"
                            res.status(500).json({message, data: error})
                        })
                }
            })
    })
}