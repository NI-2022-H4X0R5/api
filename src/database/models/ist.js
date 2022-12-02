module.exports = (sequelize, DataTypes) => {
    return sequelize.define('IST', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            transmission: {
                type: DataTypes.STRING,
                allowNull: false,
                get() {
                    return this.getDataValue(`transmission`).split(",");
                },
                set(types) {
                    this.setDataValue('transmission', types.join());
                }
            },
            symptoms: {
                type: DataTypes.STRING,
                allowNull: false,
                get() {
                    return this.getDataValue(`symptoms`).split(",");
                },
                set(types) {
                    this.setDataValue('symptoms', types.join());
                }
            },
            treatments: {
                type: DataTypes.STRING,
                allowNull: false,
                get() {
                    return this.getDataValue(`treatments`).split(",");
                },
                set(types) {
                    this.setDataValue('treatments', types.join());
                }
            },
            incubation_time: {
                type: DataTypes.STRING,
                allowNull: false
            },
            risks: {
                type: DataTypes.STRING,
                allowNull: false,
                get() {
                    return this.getDataValue(`risks`).split(",");
                },
                set(types) {
                    this.setDataValue('risks', types.join());
                }
            },
            affected_pop: {
                type: DataTypes.STRING,
                allowNull: false,
                get() {
                    return this.getDataValue(`affected_pop`).split(",");
                },
                set(types) {
                    this.setDataValue('affected_pop', types.join());
                }
            },
            stats: {
                type: DataTypes.STRING,
                allowNull: false,
                get() {
                    return this.getDataValue(`stats`).split(",");
                },
                set(types) {
                    this.setDataValue('stats', types.join());
                }
            },
            screening: {
                type: DataTypes.STRING,
                allowNull: false,
                get() {
                    return this.getDataValue(`screening`).split(",");
                },
                set(types) {
                    this.setDataValue('screening', types.join());
                }
            },
            link: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            timestamps: false
        });
}
