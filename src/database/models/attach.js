module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Attach', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            uri: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            alt: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'A picture'
            }
        },
        {
            timestamps: false
        });
}
