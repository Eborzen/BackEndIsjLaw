const { Sequelize, DataTypes } = require('sequelize')
const AlineaModel = require('./Models/Code Penal/Alinea')
const ArticleModel = require('./Models/Code Penal/article')
const ChapitreModel = require('./Models/Code Penal/chapitre')
const LivreModel = require('./Models/Code Penal/Livre')
const QuestionModel = require('./Models/Code Penal/question')
const ReponseModel = require('./Models/Code Penal/reponse')
const SectionModel = require('./Models/Code Penal/section')
const TitreModel = require('./Models/Code Penal/titre')
const UserModel = require('../db/Models/User')
const bcrypt = require('bcrypt')

const sequelize = new Sequelize('sql7608763', 'sql7608763', 'xJH3L4isxU', {
  host: 'sql7.freesqldatabase.com',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2'
  },
  logging: true
})

sequelize.authenticate()
  .then(_ => console.log("La connexion à la base de données a réussi"))
  .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

  //Creation des tables
  const Titre = TitreModel(sequelize , DataTypes)
  const Article = ArticleModel(sequelize, DataTypes)
  const Chapitre = ChapitreModel(sequelize, DataTypes)
  const Livre = LivreModel(sequelize, DataTypes)
  const Alinea = AlineaModel(sequelize, DataTypes)
  const Section = SectionModel(sequelize, DataTypes)
  const Question = QuestionModel(sequelize,  DataTypes)
  const Reponse = ReponseModel(sequelize, DataTypes)
  const User = UserModel(sequelize, DataTypes)

  //Creation des associations
  //association Livre(1,*)Titre
Livre.hasMany(Titre,{
  onDelete : 'CASCADE',
  onUpdate : 'CASCADE'
})
Titre.belongsTo(Livre)
// association Titre(1,*)Chapitre
Titre.hasMany(Chapitre,{
  onDelete : 'CASCADE',
  onUpdate : 'CASCADE'
})
Chapitre.belongsTo(Titre)
// association Chapitre(1,*)Section
Chapitre.hasMany(Section,{
  onDelete : 'CASCADE',
  onUpdate : 'CASCADE'
})
Section.belongsTo(Chapitre)
//association Section(1,*)Article
Section.hasMany(Article,{
  onDelete : 'CASCADE',
  onUpdate : 'CASCADE'
})
Article.belongsTo(Section)
// association Article(1,*)Alinea
Article.hasMany(Alinea,{
  onDelete : 'CASCADE',
  onUpdate : 'CASCADE'
})
Alinea.belongsTo(Article)
// association Reponse[1,1]Titre
Question.hasOne(Reponse)
Reponse.belongsTo(Question)
  

const initDb = () => {
  return sequelize.sync({ alter : true}).then(_ => {
    console.log("La base de données a été initialisé")
  })
}

module.exports = {
 initDb, Titre , Article , Chapitre , Livre , Alinea , Section, Question, Reponse, User
}