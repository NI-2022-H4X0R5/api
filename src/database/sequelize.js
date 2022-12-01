const { Sequelize, DataTypes } = require('sequelize')

let sequelize;
if(process.env.DB_TYPE === "sqlite"){
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'database.db',
        logging: process.env.DB_LOGGING === "true"
    });
}else{
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: process.env.DB_TYPE,
        logging: process.env.DB_LOGGING === "true"
    });
}

// Loading models
const models = require('../handlers/modelHandler')(sequelize, DataTypes);

// Primary keys
models.User.hasMany(models.Game, {foreignKey: 'userId', sourceKey: 'id'});
models.User.hasMany(models.TempCode, {foreignKey: 'userId', sourceKey: 'id'});
models.Question.hasMany(models.Attach, {foreignKey: 'questionId', sourceKey: 'id'});
models.Question.hasMany(models.Response, {foreignKey: 'questionId', sourceKey: 'id'});
models.Question.hasMany(models.TempCode, {foreignKey: 'questionId', sourceKey: 'id'});
models.Question.hasMany(models.Score, {foreignKey: 'questionId', sourceKey: 'id'});
models.Game.hasMany(models.Score, {foreignKey: 'gameCode', sourceKey: 'code'});

sequelize.sync({force: true}).then(_ => {
    console.log('Database synchronized');
});

module.exports = {
    models
}

