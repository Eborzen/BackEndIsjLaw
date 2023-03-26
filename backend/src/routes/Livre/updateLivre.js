const {Livre} = require('../../db/sequelize')
const {ValidationError, UniqueConstraintError, ForeignKeyConstraintError} = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.put('/codepenal/livre/:id', auth, (req, res) => {
        const id = req.params.id
        Livre.update(req.body, {
            where : {id_livre: id}
        })
            .then(_ => {
                return Livre.findByPk(id).then(livre => {
                    if (livre === null) {
                        const message = "La ressource demandée n'existe pas . Réessayer avec un autre identifiant"
                        return res.status(404).json({ message })
                    }
                const message = `le Livre ${req.body.id_livre} a bien été mis à jour`
                res.json({message , data : livre})
            })
            .catch(error => {
                if(error instanceof (ValidationError || UniqueConstraintError || ForeignKeyConstraintError))
                    res.status(404).json({error, data:error.message})
                const message = "Erreur lors du traitement . Reesayer dans quelques instants"
                res.status(500).json({message, data: error})
            })
        })
    })
}