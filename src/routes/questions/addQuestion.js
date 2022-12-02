const {models} = require('../../database/sequelize');

module.exports = (app) => {
    app.post('/api/questions', async (req, res) => {
        if(!req.body.question.name)
            return res.status(400).json({message: "Missing question name"});
        const questionCheck = await models.Question.findOne({where: {name: req.body.question.name}})
        if(!questionCheck) {
            return res.status(400).json({message: "Question name already exists"});
        }
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
        }).catch(err => {
            res.status(400).json(err);
        });
    });
}
