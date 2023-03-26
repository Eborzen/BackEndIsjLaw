const {Titre} = require('../../db/sequelize')
const {ValidationError, UniqueConstraintError, ForeignKeyConstraintError, DatabaseError} = require('sequelize')
const auth = require('../../auth/auth')
module.exports = (app) => {
    app.put('/codepenal/titre/:id', auth, (req, res) => {
        const id = req.params.id
        Titre.update(req.body, {
            where : {id_titre: id}
        })
            .then(_ => {
                 return Titre.findByPk(id).then(titre => {
                    if (titre === null) {
                        const message = "La ressource demandée n'existe pas . Réessayer avec un autre identifiant"
                        return res.status(404).json({ message })
                    }
                const message = `le Titre ${req.body.id_titre} a bien été mis à jour`
                res.json({message , data : titre})
            })
            .catch(error => {
                if(error instanceof (ValidationError || UniqueConstraintError || ForeignKeyConstraintError || DatabaseError) )
                    res.status(404).json({error, data:error.message})
                const message = "Erreur lors du traitement . Reesayer dans quelques instants"
                res.status(500).json({message, data: error})
            })
        })
    })
}