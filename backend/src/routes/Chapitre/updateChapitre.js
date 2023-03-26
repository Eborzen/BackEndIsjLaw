const {Chapitre} = require('../../db/sequelize')
const {ValidationError,UniqueConstraintError,ForeignKeyConstraintError} = require('sequelize')

module.exports = (app) => {
    app.put('/codepenal/chapitre/:id', (req, res) => {
        const id = req.params.id
        Chapitre.update(req.body, {
            where : {id_chapitre: id}
        })
            .then(_ => {
                return Chapitre.findByPk(id).then(chapitre => {
                    if (chapitre === null) {
                        const message = "La ressource demandée n'existe pas . Réessayer avec un autre identifiant"
                        return res.status(404).json({ message })
                    }
                const message = `le Chapitre ${req.body.id_chapitre} a bien été mis à jour`
                res.json({message , data : chapitre})
            })
            .catch( error => {
                if(error instanceof (ValidationError || UniqueConstraintError || ForeignKeyConstraintError))
                    res.status(404).json({error, data:error.message})
                const message = "Erreur lors du traitement . Reesayer dans quelques instants"
                res.status(500).json({message, data: error})
            })
        })
    })
}