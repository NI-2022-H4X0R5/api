module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Response', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            score: {
                type: DataTypes.INTEGER,
                allowNull: false
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
