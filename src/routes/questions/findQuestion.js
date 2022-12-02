const {models} = require('../../database/sequelize');

module.exports = (app) => {
    app.get('/api/questions/:ageRange', (req, res) => {
        const ageRange = req.params.ageRange;
        models.Question.findAll({where: {ageRange}}).then(question => {
            const count = question.length;
            const random = Math.floor(Math.random() * count);
            models.Response.findAll({where: {questionId: question[random].id}}).then(responses => {
                const questionWithResponses = {
                    ...question[random].dataValues,
                    responses: responses.map(response => response.dataValues)
                }
                res.status(200).json(questionWithResponses);
            });
        });
    });
}
