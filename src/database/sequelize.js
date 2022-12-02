const { Sequelize, DataTypes } = require('sequelize')
const {encrypt} = require('../tools/encryption');

let sequelize;
const type = process.env.DB_TYPE || 'sqlite';
const logging = process.env.DB_LOGGING || false;
if(type === "sqlite"){
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'database.db',
        logging: logging === "true"
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
models.Question.hasMany(models.Attach, {foreignKey: 'questionId', sourceKey: 'id'});
models.Question.hasMany(models.Response, {foreignKey: 'questionId', sourceKey: 'id'});
models.Question.hasMany(models.TempCode, {foreignKey: 'questionId', sourceKey: 'id'});
models.Question.hasMany(models.Score, {foreignKey: 'questionId', sourceKey: 'id'});
models.Game.hasMany(models.Score, {foreignKey: 'gameCode', sourceKey: 'code'});

const sync = async () => {
    await sequelize.sync({force: true});
    await seed();
}

const seed = () => {
    return sequelize.sync({force: true}).then(async _ => {
        return models.User.create({
            username: "root",
            password: await encrypt("root")
        });
    });
}

module.exports = {
    models, sync
}
