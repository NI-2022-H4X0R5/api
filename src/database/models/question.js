module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Question', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            hintLabel: {
                type: DataTypes.STRING,
                allowNull: true
            },
            hintContent: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            timestamps: false
        });
}
