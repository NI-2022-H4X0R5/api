const auth = require('../../middlewares/authentication');
const {models} = require('../../database/sequelize');

module.exports = (app) => {
    app.get('/api/scores/:userId', auth, (req, res) => {
        const userId = req.params.userId;
        const finalScores = [];
        models.Game.findAll({where: {userId}}).then(async games => {
            for (let game of games) {
                const gameCode = game.code;
                let finalScore = 0;
                const scores = await models.Score.findAll({where: {gameCode}});
                for (let score of scores) {
                    finalScore += score.score;
                }
                finalScores.push({gameCode, finalScore});
            }
            res.status(200).json(finalScores);
        });
    });
}
