module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Game', {
            code: {
                type: DataTypes.STRING,
                primaryKey: true
            }
        },
        {
            timestamps: false
        });
}
