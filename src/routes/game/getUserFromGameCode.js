const {models} = require('../../database/sequelize');

module.exports = (app) => {
    app.get('/api/games/:gameCode', async (req, res) => {
        const gameCode = req.params.gameCode;
        const game = await models.Game.findAll({where: {code: gameCode}});
        const userId = game[0].userId;
        const user = await models.User.findOne({where: {id: userId}});
        const userWithoutPassword = user.toJSON();
        delete userWithoutPassword.password;
        res.status(200).json(userWithoutPassword);
    });
}
