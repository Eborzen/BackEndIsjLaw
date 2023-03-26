const {Alinea} = require('../../db/sequelize')

module.exports = (app) => {
    app.get('/codepenal/alinea/:id',  (req, res) => {
        Alinea.findByPk(req.params.id)
            .then(alinea => {
                if( alinea === null){
                    const message = "La ressource demandée n'existe pas . Réessayer avec un autre identifiant"
                    res.status(404).json({message})
                }
                const message = `L' alinea ${req.params.id} a été trouvée`
                res.json({ message, data: alinea })
            })
            .catch(error => {
                const message = "Erreur lors de la requête. Réessayer dans quelques instants."
                res.status(500).json({message, data: error})
            })
    })
}