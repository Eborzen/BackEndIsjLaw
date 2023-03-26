const {Alinea} = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.delete('/codepenal/alinea/:id', auth, (req, res) => {
        Alinea.findByPk(req.params.id).then(alinea => {
            if( alinea === null){
                const message = "La ressource demandée n'existe pas . Réessayer avec un autre identifiant"
               return res.status(404).json({message})
            }
            const alineaDeleted = alinea;
            return Alinea.destroy({
                where : {id_alinea : alinea.id_alinea}
            })
            .then(_ => {
                const message = `L'alinéa avec l'identifiant ${alineaDeleted.id_alinea} a bien été supprimé`
                res.json({message , data : alineaDeleted})
            })
            .catch(error => {
                const message = "Erreur lors du traitement de la requête . Reessayer dans quelques instants"
                res.status(500).json({message, data: error})
            })
        })
    })
}