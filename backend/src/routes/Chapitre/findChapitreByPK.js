const { Chapitre, Article, Alinea, Section } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/codepenal/chapitre/:id', auth, (req, res) => {
        const id = req.params.id
        Chapitre.findByPk(id)
            .then(chapitre => {
                if (chapitre === null) {
                    const message = "La ressource demandée n'existe pas . Réessayer avec un autre identifiant"
                    res.status(404).json({ message })
                }
                else {
                    Chapitre.findAll({
                        include: [{
                            model: Section,
                            include: [{
                                model: Article,
                                include: {
                                    model: Alinea
                                }
                            }]
                        }],
                        where: {
                            id_chapitre: id
                        }
                    })
                        .then(chapitre => {
                            const message = 'La liste des chapitres a bien été récupéré.'
                            res.json({ message, data: chapitre })
                        })
                }
            })
            .catch(error => {
                const message = "Erreur lors de la requête . Reessayer dans quelques instants"
                res.status(500).json({message, data : error})
            })
    })
}