const {models} = require('../../database/sequelize');

module.exports = (app) => {
    app.post('/api/questions', (req, res) => {
        models.Question.create(req.body.question).then(question => {
            const responses = req.body.responses;
            for(let response of responses){
                models.Response.create({
                    questionId: question.id,
                    content: response.content,
                    score: response.score
                });
            }
            res.status(201).json(question);
        });

    });
}
