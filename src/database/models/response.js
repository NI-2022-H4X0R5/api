module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Response', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            score: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            timestamps: false
        });
}
