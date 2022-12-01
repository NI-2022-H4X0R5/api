module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Score', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            score: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            timestamps: false
        });
}
