const {Titre} = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.delete('/codepenal/titre/:id', auth , (req, res) => {
        Titre.findByPk(req.params.id).then(titre => {
            const TitreDeleted = titre;
            Titre.destroy({
                where : {id_titre : titre.id_titre}
            })
            .then(_ => {
                const message = `Le Titre avec l'identifiant ${TitreDeleted.id_titre} a bien été supprimé`
                res.json({message , data : TitreDeleted})
            })
            .catch(error =>{
                const message = "Erreur lors du traitement de la requête. Réessayer dans quelques instants."
                res.status(500).json({message, data: error})
            })
        })
    })
    
}