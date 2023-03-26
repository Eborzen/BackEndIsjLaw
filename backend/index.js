const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const favicon = require('serve-favicon')
const sequelize = require('./src/db/sequelize')

// Connexion a la base de donnéestre
sequelize.initDb();

// Middleware de traitements
app
  .use(favicon(__dirname + '/favicon.ico'))
  .use(bodyParser.json())
  
// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// route pour tester le succès du déploiement
app.get('/', (req, res) =>{
  res.json("Hello Heroku")
})

// listes des routes
require('./src/routes/Section/findAllSection')(app)
require('./src/routes/Section/findSectionByPK')(app)
require('./src/routes/Section/createSection')(app)
require('./src/routes/Section/updateSection')(app)
require('./src/routes/Section/deleteSection')(app)
require('./src/routes/Chapitre/createChapitre')(app)
require('./src/routes/Chapitre/findAllChapitre')(app)
require('./src/routes/Chapitre/deleteChapitre')(app)
require('./src/routes/Chapitre/updateChapitre')(app)
require('./src/routes/Chapitre/findChapitreByPK')(app)
require('./src/routes/Alinea/createAlinea')(app)
require('./src/routes/Alinea/deleteAlinea')(app)
require('./src/routes/Alinea/findAllAlinea')(app)
require('./src/routes/Alinea/updateAlinea')(app)
require('./src/routes/Alinea/findAlineaByPK')(app)
require('./src/routes/Article/findArticleByPK')(app)
require('./src/routes/Article/findAllArticle')(app)
require('./src/routes/Article/updateArticle')(app)
require('./src/routes/Article/deleteArticle')(app)
require('./src/routes/Article/createArticle')(app)
require('./src/routes/Livre/findLivreByPK')(app)
require('./src/routes/Livre/findAllLivre')(app)
require('./src/routes/Livre/updateLivre')(app)
require('./src/routes/Livre/deleteLivre')(app)
require('./src/routes/Livre/createLivre')(app)
require('./src/routes/Titre/findTitreByPK')(app)
require('./src/routes/Titre/findAllTitre')(app)
require('./src/routes/Titre/updateTitre')(app)
require('./src/routes/Titre/deleteTitre')(app)
require('./src/routes/Titre/createTitre')(app)
require('./src/routes/Login')(app)

// On gère l'erreur 404 si il ne trouve aucune route
app.use(({res}) => {
  const message = "Impossible de trouver la ressource demandée. Vous pouvez essayer une autre URL"
  res.status(404).json({message})
})
