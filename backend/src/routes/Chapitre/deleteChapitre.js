const {Chapitre} = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.delete('/codepenal/chapitre/:id', auth , (req, res) => {
        Chapitre.findByPk(req.params.id).then(chapitre => {
            if( chapitre === null){
                const message = "La ressource demandée n'existe pas . Réessayer avec un autre identifiant"
               return res.status(404).json({message})
            }
            const ChapitreDeleted = chapitre;
             return Chapitre.destroy({
                where : {id_chapitre : chapitre.id_chapitre}
            })
            .then(_ => {
                const message = `Le Chapitre avec l'identifiant ${ChapitreDeleted.id_chapitre} a bien été supprimé`
                res.json({message , data : ChapitreDeleted})
            })
            .catch(error => {
                const message = "Erreur lors du traitement de la requête . Reessayer dans quelques instants"
                res.status(500).json({message, data: error})
            })
        })
    })
}