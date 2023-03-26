module.exports = (sequelize, DataTypes) => {
    return sequelize.define('article', {
        id_article: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        libelle: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }
        , {
            timestamps: false,
            freezeTableName: true
        })
}
