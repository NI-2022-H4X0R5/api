const loadFiles = require('./fileHandler');

module.exports = (sequelize, DataTypes) => {
    const models = {};
    const files = loadFiles('./src/database/models', true);
    files.forEach(file => {
        console.log(`Registering model ${file}...`);
        const model = require(`../database/models/${file}`)(sequelize, DataTypes);
        models[model.name] = model;
    })
    return models;
}
