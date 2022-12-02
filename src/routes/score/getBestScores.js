const {models} = require('../../database/sequelize');

module.exports = (app) => {
    app.get('/api/scores', async (req, res) => {
        const bestScores = [];
        const allScores = [];
        const games = await models.Game.findAll();
        for (let game of games) {
            const gameCode = game.code;
            const finalScore = await getGameScore(gameCode);
            allScores.push({gameCode, finalScore});
        }
        allScores.sort((a, b) => b.finalScore - a.finalScore);
        for (let i = 0; i < 10 && i < allScores.length; i++) {
            bestScores.push(allScores[i]);
        }
        res.status(200).json(bestScores);
    });
}

const getGameScore = async (gameCode) => {
    const scores = await models.Score.findAll({where: {gameCode}});
    let finalScore = 0;
    for (let score of scores) {
        finalScore += score.score;
    }
    return finalScore;
}
