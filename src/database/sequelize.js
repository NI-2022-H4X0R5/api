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
    sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
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
    await sequelize.sync({force: process.env.DB_FORCE === "true"});
    if(process.env.BD_SEED === "true"){
        await seed();
        console.log("Database seeded");
    }
}

const seed = async () => {
    await sequelize.sync({force: true}).then(async _ => {
        return models.User.create({
            username: "root",
            password: await encrypt("root")
        });
    });
    for(let question of mockIST){
        await models.IST.create({
            name: question.name,
            description: question.description,
            transmission: question.transmission,
            symptoms: question.symptoms,
            treatments: question.treatments,
            incubation_time: question.incubation_time,
            risks: question.risks,
            affected_pop: question.affected_pop,
            stats: question.stats,
            screening: question.screening,
            links: question.link
        })
    }
    for(let question of mockQuestions){
        const createdQuestion = await models.Question.create({
            name: question.name,
            type: question.type,
            content: question.content,
            ageRange: question.ageRange,
            hintLabel: question.hintLabel,
            hintContent: question.hintContent
        })
        for(let response of question.responses){
            await models.Response.create({
                questionId: createdQuestion.id,
                content: response.content,
                score: response.score
            });
        }
    }

}

module.exports = {
    models, sync
}
