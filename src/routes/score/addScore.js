const auth = require('../../middlewares/authentication');
const {models} = require('../../database/sequelize');

module.exports = (app) => {
    app.post('/api/scores', auth, (req, res) => {
        const questionId = req.body.questionId;
        const score = req.body.score;
        models.Game.create({
            userId: req.user.id
        }).then(game => {
            models.Score.create({
                questionId,
                gameId: game.id,
                score
            }).then(score => {
                res.status(201).json(score);
            })
        })

    });
}
