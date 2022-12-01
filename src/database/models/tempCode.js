module.exports = (sequelize, DataTypes) => {
    return sequelize.define('TempCode', {
            code: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            validate: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            timestamps: false
        });
}
