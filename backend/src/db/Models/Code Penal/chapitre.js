module.exports = (sequelize, DataTypes) => {
    return sequelize.define('chapitre', {
        id_chapitre: {
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
