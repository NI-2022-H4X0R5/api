const auth = require('../../middlewares/authentication');
const {models} = require('../../database/sequelize');

module.exports = (app) => {
    app.post('/api/scores', auth, (req, res) => {
        const questionId = req.body.questionId;
        const score = req.body.score;
        models.Score.create({
            questionId,
            gameCode: req.body.gameCode,
            score
        }).then(score => {
            res.status(201).json(score);
        })

    });
}
