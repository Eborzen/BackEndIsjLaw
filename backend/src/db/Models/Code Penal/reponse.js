module.exports = (sequelize, DataTypes) => {
    return sequelize.define('reponse', {
        id_reponse: {
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
