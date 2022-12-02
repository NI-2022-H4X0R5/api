const { Sequelize, DataTypes } = require('sequelize')
const {encrypt} = require('../tools/encryption');

const mockIST = require('../resources/mockIST');
const mockQuestions = require('../resources/mockQuestions');

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

const seed = async () => {
    await sequelize.sync({force: true}).then(async _ => {
        return models.User.create({
            username: "root",
            password: await encrypt("root")
        });
    });
    await models.IST.create({
        name: mockIST[0].name,
        description: mockIST[0].description,
        transmission: mockIST[0].transmission,
        symptoms: mockIST[0].symptoms,
        treatments: mockIST[0].treatments,
        incubation_time: mockIST[0].incubation_time,
        risks: mockIST[0].risks,
        affected_pop: mockIST[0].affected_pop,
        stats: mockIST[0].stats,
        screening: mockIST[0].screening,
        links: mockIST[0].link
    })
    await models.Question.create({
        name: mockQuestions[0].name,
        type: mockQuestions[0].type,
        ageRange: mockQuestions[0].ageRange,
        hintLabel: mockQuestions[0].hintLabel,
        hintContent: mockQuestions[0].hintContent
    })
    for(let response of mockQuestions[0].responses){
        await models.Response.create({
            questionId: 1,
            content: response.content,
            score: response.score
        });
    }
}

module.exports = {
    models, sync
}
