module.exports = (sequelize, DataTypes) => {
    return sequelize.define('titre', {
        id_titre: {
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
