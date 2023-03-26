module.exports = (sequelize, DataTypes) => {
    return sequelize.define('alinea', {
        id_alinea: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
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
