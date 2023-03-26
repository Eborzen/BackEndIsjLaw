const {Alinea} = require('../../db/sequelize')
const {ForeignKeyConstraintError, ValidationError , UniqueConstraintError} = require('sequelize')

module.exports = (app) => {
    app.put('/codepenal/alinea/:id', (req, res) => {
        const id = req.params.id
        Alinea.update(req.body, {
            where : {id_alinea: id}
        })
            .then(_ => {
                return Alinea.findByPk(id).then(alinea => {
                    if( alinea === null){
                        const message = "La ressource demandée n'existe pas . Réessayer avec un autre identifiant"
                       return res.status(404).json({message})
                    }
                const message = `le Alinea ${req.body.id_alinea} a bien été mis à jour`
                res.json({message , data : alinea})
            })
        })
            .catch( error => {
                if(error instanceof (ValidationError || UniqueConstraintError || ForeignKeyConstraintError))
                    res.status(404).json({error, data:error.message})
                const message = "Erreur lors du traitement . Reesayer dans quelques instants"
                res.status(500).json({message, data: error})
            })
    })
}