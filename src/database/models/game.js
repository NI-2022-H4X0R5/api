module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Game', {
            code: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            }
        },
        {
            timestamps: false
        });
}
