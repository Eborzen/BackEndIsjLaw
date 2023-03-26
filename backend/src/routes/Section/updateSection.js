const {Section} = require('../../db/sequelize')
const {ForeignKeyConstraintError, ValidationError, UniqueConstraintError} = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.put('/codepenal/section/:id',  auth, (req, res) => {
        const id = req.params.id
        Section.update(req.body, {
            where : {id_section: id}
        })
            .then(_ => {
                return Section.findByPk(id).then(section => {
                    if (section === null) {
                        const message = "La ressource demandée n'existe pas . Réessayer avec un autre identifiant"
                        return res.status(404).json({ message })
                    }
                const message = `la Section ${req.body.id_section} a bien été mis à jour`
                res.json({message , data : section})
            })
            .catch(error => {
                if(error instanceof (ValidationError || UniqueConstraintError || ForeignKeyConstraintError ))
                    res.status(404).json({error, data:error.message})
                const message = "Erreur lors du traitement . Reesayer dans quelques instants"
                res.status(500).json({message, data: error})
            })
        })
    })
}