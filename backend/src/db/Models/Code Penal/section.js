module.exports = (sequelize, DataTypes) => {
    return sequelize.define('section', {
        id_section: {
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
