const {Section} = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.delete('/codepenal/section/:id', auth, (req, res) => {
        Section.findByPk(req.params.id).then(section => {
            if( section === null){
                const message = "La ressource demandée n'existe pas . Réessayer avec un autre identifiant"
               return res.status(404).json({message})
            }
            const SectionDeleted = section;
            return Section.destroy({
                where : {id_section : section.id_section}
            })
            .then(_ => {
                const message = `La Section avec l'identifiant ${SectionDeleted.id_section} a bien été supprimé`
                res.json({message , data : SectionDeleted})
            })
            .catch(error => {
                const message = "Erreur lors du traitement de la requête . Reessayer dans quelques instants"
                res.status(500).json({message, data: error})
            })
        })
    })
}