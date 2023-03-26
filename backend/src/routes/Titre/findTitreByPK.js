const { Titre, Alinea, Article, Chapitre, Section } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/codepenal/titre/:id', auth, (req, res) => {
        const id = req.params.id
        Titre.findByPk(id)
            .then(titre => {
                if (titre === null) {
                    const message = "La ressource demandée n'existe pas . Essayer un autre identifiant"
                    res.status(404).json({ message })
                }
                else {
                    Titre.findAll({
                        include: [{
                            model: Chapitre,
                            include: [{
                                model: Section,
                                include: [{
                                    model: Article,
                                    include: {
                                        model: Alinea,
                                    }
                                }]
                            }]

                        }],
                        where: { id_titre: id }
                    })
                        .then(titre => {
                            const message = `Le titre avec l'identifiant ${id} a bien été récupéré.`
                            res.json({ message, data: titre })
                        })
                }
            })
            .catch(error => {
                const message = "Erreur lors du traitement de la requête . Reessayer dans quelques instants"
                res.status(500).json({message, data: error})
            })

    })
}