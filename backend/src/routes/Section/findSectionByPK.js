const { Section, Article, Alinea } = require('../../db/sequelize')

module.exports = (app) => {
    app.get('/codepenal/section/:id', (req, res) => {
        const id = req.params.id
        Section.findByPk(id)
            .then(section => {
                if (section === null) {
                    const message = "La ressource demandée n'existe pas . Essayer un autre identifiant"
                    res.status(404).json({ message })
                }
                else {
                    Section.findAll({
                        include: [{
                            model: Article,
                            include: [{
                                model: Alinea,
                            }]
                        }],
                        where: {
                            id_section: id
                        }
                    })
                        .then(sections => {
                            const message = `La Section ${id} a bien été récupéré.`
                            res.json({ message, data: sections })
                        })
                }
            })
            .catch(error => {
                const message = "Erreur lors du traitement de la requête . Reessayer dans quelques instants"
                res.status(500).json({message, data: error})
            })

    })
}