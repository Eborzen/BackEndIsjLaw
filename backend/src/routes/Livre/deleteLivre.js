const {Livre} = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.delete('/codepenal/livre/:id', auth, (req, res) => {
        Livre.findByPk(req.params.id).then(livre => {
            if( livre === null){
                const message = "La ressource demandée n'existe pas . Réessayer avec un autre identifiant"
               return res.status(404).json({message})
            }
            const LivreDeleted = livre;
            return Livre.destroy({
                where : {id_livre : livre.id_livre}
            })
            .then(_ => {
                const message = `Le livre avec l'identifiant ${LivreDeleted.id_livre} a bien été supprimé`
                res.json({message , data : LivreDeleted})
            })
            .catch(error => {
                const message = "Erreur lors du traitement de la requête . Reessayer dans quelques instants"
                res.status(500).json({message, data: error})
            })
        })
    })
}