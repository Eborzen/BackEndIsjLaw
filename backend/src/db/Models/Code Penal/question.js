module.exports = (sequelize, DataTypes) => {
    return sequelize.define('question', {
        id_question: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        contenu : {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
        , {
            timestamps: false,
            freezeTableName: true
        })
}
