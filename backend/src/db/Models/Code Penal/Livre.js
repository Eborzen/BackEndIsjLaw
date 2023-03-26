module.exports = (sequelize, DataTypes) => {
    return sequelize.define('livre', {
        id_livre: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        libelle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    }
    , {
    timestamps: false,
    freezeTableName: true
})
}
